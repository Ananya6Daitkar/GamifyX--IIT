# Database & Cache Setup Documentation

## Overview

This document describes the database and cache layer setup for the AI-Powered Education Platform MVP.

## Database Schema

### Core Models

#### User
- Base user model for all roles (Student, Teacher, Admin, Mentor)
- Fields: id, email, name, role, institutionId, avatarUrl, language, theme, createdAt, updatedAt
- Relations: institution, student profile, classes taught, feedback given, grievances assigned

#### Institution
- Represents an educational institution
- Fields: id, name, domain, createdAt, updatedAt
- Relations: users, classes

#### Student
- Extended profile for student users
- Fields: id, userId, githubUsername, githubConnected, currentPoints, currentLevel, currentStreak, riskScore, riskLevel
- Relations: user, submissions, feedback received, grievances, badges, risk predictions, chat messages

#### Class
- Represents a class/course
- Fields: id, name, description, institutionId, createdAt, updatedAt
- Relations: institution, teachers, assignments

#### TeacherClass
- Junction table for teacher-class relationships
- Fields: id, userId, classId, createdAt
- Ensures many-to-many relationship between teachers and classes

#### Assignment
- Represents an assignment in a class
- Fields: id, classId, title, description, dueDate, createdAt, updatedAt
- Relations: class, submissions

#### Submission
- Student submission for an assignment
- Fields: id, studentId, assignmentId, githubUrl, codeQualityScore, complexityScore, submittedAt, createdAt, updatedAt
- Relations: student, assignment, feedback

#### Feedback
- Teacher feedback on a submission
- Fields: id, submissionId, teacherId, studentId, aiSuggested, content, rating, createdAt, updatedAt
- Relations: submission, teacher, student

#### Grievance
- Student grievance/complaint
- Fields: id, studentId, category, severity, description, status, assignedToId, resolution, createdAt, resolvedAt, updatedAt
- Categories: GRADE, FEEDBACK, FAIRNESS, OTHER
- Severity: LOW, MEDIUM, HIGH, CRITICAL
- Status: OPEN, IN_PROGRESS, RESOLVED, CLOSED
- Relations: student, assigned authority, audit logs

#### GrievanceAuditLog
- Immutable audit trail for grievances
- Fields: id, grievanceId, action, details, createdAt
- Relations: grievance

#### Badge
- Achievement badge
- Fields: id, name, description, iconUrl, criteria, rarity, createdAt
- Rarity: COMMON, RARE, EPIC, LEGENDARY
- Relations: students, gamification events

#### StudentBadge
- Junction table for student-badge relationships
- Fields: id, studentId, badgeId, unlockedAt
- Ensures many-to-many relationship with unlock tracking

#### GamificationEvent
- Tracks points and badge awards
- Fields: id, studentId, userId, eventType, pointsAwarded, badgeUnlockedId, createdAt
- EventType: SUBMISSION, FEEDBACK, ACHIEVEMENT, STREAK
- Relations: student, user, badge

#### RiskPrediction
- ML model predictions for student risk
- Fields: id, studentId, riskScore, riskLevel, submissionFrequency, codeQualityTrend, engagementScore, feedbackResponseTime, confidence, predictedAt, createdAt
- Relations: student

#### ChatMessage
- Chatbot conversation messages
- Fields: id, userId, studentId, content, role, createdAt
- Role: USER, ASSISTANT
- Relations: user, student

#### AuditLog
- Comprehensive audit trail for compliance
- Fields: id, userId, action, resource, details, createdAt
- Relations: user

## Redis Cache Layer

### Purpose
- Session management
- Real-time data caching
- Leaderboard rankings
- Rate limiting
- Message queues

### Key Patterns

#### Session Management
```
Key: session:{userId}
TTL: 3600 seconds (1 hour)
Value: JSON serialized session data
```

#### Cache Keys
```
Key: cache:{resource}:{id}
TTL: Configurable (default 3600)
Value: JSON serialized data
```

#### Leaderboard
```
Key: leaderboard:{classId}
Type: Sorted Set
Score: points
Member: studentId
```

#### Real-time Updates
```
Key: updates:{resource}:{id}
Type: Stream
Value: Change events
```

## Setup Instructions

### Prerequisites
- PostgreSQL 13+
- Redis 6+
- Node.js 18+

### Environment Variables
```
DATABASE_URL="postgresql://user:password@localhost:5432/ai_education"
REDIS_URL="redis://localhost:6379"
```

### Database Setup
```bash
# Install dependencies
npm install

# Run migrations
npm run db:migrate

# Seed demo data
npm run db:seed
```

### Redis Setup
```bash
# Start Redis (if using Docker)
docker run -d -p 6379:6379 redis:latest

# Or install locally
brew install redis
redis-server
```

## Prisma Commands

```bash
# Generate Prisma Client
npx prisma generate

# Create a new migration
npx prisma migrate dev --name migration_name

# Apply pending migrations
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset

# View database in Prisma Studio
npx prisma studio

# Seed database
npm run db:seed
```

## Data Models Relationships

```
Institution
├── Users (many)
│   ├── Student Profile (one)
│   │   ├── Submissions (many)
│   │   │   └── Feedback (many)
│   │   ├── Grievances (many)
│   │   │   └── Audit Logs (many)
│   │   ├── Badges (many)
│   │   ├── Risk Predictions (many)
│   │   └── Chat Messages (many)
│   ├── Teacher Classes (many)
│   ├── Feedback Given (many)
│   └── Grievances Assigned (many)
└── Classes (many)
    ├── Teachers (many)
    └── Assignments (many)
        └── Submissions (many)
```

## Correctness Properties

### Property 6: Feedback Persistence
*For any* feedback submitted by a teacher, querying the student's feedback list should include that feedback with identical content and timestamp.

**Implementation:**
- Feedback is stored in PostgreSQL with immutable timestamps
- Queries use Prisma ORM for consistency
- Redis caches feedback for performance

### Property 7: Grievance Routing Correctness
*For any* grievance filed by a student, it should be routed to the correct authority based on category.

**Implementation:**
- Grievance routing logic in service layer
- Category-based assignment rules
- Audit trail tracks all routing decisions

### Property 8: Grievance Resolution Audit Trail
*For any* grievance, the complete history of status changes, assignments, and resolutions should be immutable and queryable.

**Implementation:**
- GrievanceAuditLog table stores all changes
- Immutable records with timestamps
- Queryable via grievanceId

## Performance Considerations

### Indexing
- User email (unique)
- Student userId (unique)
- Submission studentId and assignmentId
- Feedback submissionId
- Grievance studentId and status
- Badge name (unique)

### Caching Strategy
- User sessions: 1 hour TTL
- Leaderboard: 5 minute TTL
- Student progress: 10 minute TTL
- Feedback suggestions: 30 minute TTL

### Query Optimization
- Use Prisma relations to avoid N+1 queries
- Implement pagination for large result sets
- Cache frequently accessed data in Redis

## Monitoring

### Database Health
- Connection pool monitoring
- Query performance tracking
- Migration status verification

### Redis Health
- Connection status
- Memory usage
- Key expiration tracking

## Backup & Recovery

### Database Backups
```bash
# Backup PostgreSQL
pg_dump ai_education > backup.sql

# Restore PostgreSQL
psql ai_education < backup.sql
```

### Redis Persistence
- RDB snapshots (point-in-time recovery)
- AOF (append-only file) for durability

## Security

### Database Security
- Use environment variables for credentials
- Enable SSL/TLS for connections
- Implement row-level security (RLS) for sensitive data
- Regular security audits

### Redis Security
- Use AUTH for password protection
- Restrict network access
- Enable encryption in transit
- Monitor for unauthorized access

## Troubleshooting

### Connection Issues
```bash
# Test PostgreSQL connection
psql $DATABASE_URL -c "SELECT 1"

# Test Redis connection
redis-cli ping
```

### Migration Issues
```bash
# Check migration status
npx prisma migrate status

# Resolve failed migrations
npx prisma migrate resolve --rolled-back migration_name
```

### Performance Issues
```bash
# Analyze slow queries
npx prisma studio

# Check Redis memory
redis-cli info memory
```
