# ☁️ AWS Tech Stack - Hackathon Edition

## 🎯 Why AWS?

Judges love AWS because:
- ✅ Enterprise-grade security
- ✅ Scalable to millions of users
- ✅ Managed services (less ops work)
- ✅ GenAI services (Bedrock)
- ✅ Real-time processing (Lambda)
- ✅ Monitoring built-in (CloudWatch)

---

## 🏗️ Complete AWS Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Layer                            │
│  AWS Amplify (React hosting + CI/CD)                         │
│  CloudFront (CDN)                                            │
│  S3 (static assets)                                          │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                    API Layer                                 │
│  API Gateway (REST API)                                      │
│  Lambda (serverless compute)                                 │
│  Cognito (authentication)                                    │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                    AI/ML Layer                               │
│  Bedrock (Claude LLM for feedback)                           │
│  SageMaker (risk prediction model)                           │
│  CodeBuild (code quality analysis)                           │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                    Data Layer                                │
│  RDS PostgreSQL (primary database)                           │
│  ElastiCache Redis (cache)                                   │
│  DynamoDB (feedback patterns)                                │
│  S3 (file storage)                                           │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                    Observability                             │
│  CloudWatch (metrics, logs, alarms)                          │
│  X-Ray (distributed tracing)                                 │
│  CloudTrail (audit logs)                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 Service-by-Service Breakdown

### Frontend: AWS Amplify

**What it does:**
- Hosts React app
- Automatic CI/CD from GitHub
- SSL/TLS by default
- Global CDN

**Setup:**
```bash
npm install -g @aws-amplify/cli
amplify init
amplify add hosting
amplify publish
```

**Cost:** Free tier covers hackathon

---

### API: API Gateway + Lambda

**What it does:**
- REST API endpoints
- Serverless compute (no servers to manage)
- Auto-scaling
- Built-in monitoring

**Lambda Functions:**
```
POST /api/feedback/generate
  → Calls Bedrock for AI feedback

POST /api/feedback/review
  → Processes teacher review

GET /api/students/{id}/feedback
  → Returns student feedback

GET /api/teachers/{id}/dashboard
  → Returns teacher dashboard data

GET /api/admin/metrics
  → Returns admin metrics
```

**Setup:**
```bash
# Create Lambda function
aws lambda create-function \
  --function-name feedback-generator \
  --runtime python3.11 \
  --role arn:aws:iam::ACCOUNT:role/lambda-role \
  --handler index.lambda_handler \
  --zip-file fileb://function.zip

# Create API Gateway
aws apigateway create-rest-api \
  --name education-api
```

**Cost:** Free tier covers hackathon

---

### AI: AWS Bedrock

**What it does:**
- Access to Claude LLM
- No model training needed
- Pay per token
- Enterprise-grade security

**Usage:**
```python
import boto3

bedrock = boto3.client('bedrock-runtime')

response = bedrock.invoke_model(
    modelId='anthropic.claude-3-sonnet-20240229-v1:0',
    body=json.dumps({
        'anthropic_version': 'bedrock-2023-06-01',
        'max_tokens': 1024,
        'messages': [
            {
                'role': 'user',
                'content': 'Analyze this code and provide feedback...'
            }
        ]
    })
)
```

**Cost:** ~$0.003 per 1K tokens (very cheap)

---

### Database: RDS PostgreSQL

**What it does:**
- Managed PostgreSQL database
- Automatic backups
- Multi-AZ for high availability
- Built-in monitoring

**Schema:**
```sql
CREATE TABLE students (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  skill_level VARCHAR(50),
  created_at TIMESTAMP
);

CREATE TABLE submissions (
  id UUID PRIMARY KEY,
  student_id UUID REFERENCES students(id),
  code TEXT,
  submitted_at TIMESTAMP
);

CREATE TABLE feedback (
  id UUID PRIMARY KEY,
  submission_id UUID REFERENCES submissions(id),
  ai_feedback TEXT,
  teacher_feedback TEXT,
  confidence FLOAT,
  created_at TIMESTAMP
);
```

**Setup:**
```bash
# Create RDS instance
aws rds create-db-instance \
  --db-instance-identifier education-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password YourPassword123!
```

**Cost:** Free tier covers hackathon (db.t3.micro)

---

### Cache: ElastiCache Redis

**What it does:**
- In-memory cache
- Fast data retrieval
- Session storage
- Real-time updates

**Usage:**
```python
import redis

cache = redis.Redis(
    host='education-cache.abc123.ng.0001.use1.cache.amazonaws.com',
    port=6379,
    decode_responses=True
)

# Cache student data
cache.set(f'student:{student_id}', student_data, ex=3600)

# Get cached data
student = cache.get(f'student:{student_id}')
```

**Setup:**
```bash
aws elasticache create-cache-cluster \
  --cache-cluster-id education-cache \
  --cache-node-type cache.t3.micro \
  --engine redis
```

**Cost:** Free tier covers hackathon (cache.t3.micro)

---

### NoSQL: DynamoDB

**What it does:**
- NoSQL database for feedback patterns
- Fast queries
- Auto-scaling
- Perfect for learning patterns

**Schema:**
```python
# Feedback patterns table
{
  'feedback_id': 'fb_12345',  # Partition key
  'timestamp': '2025-12-22T14:30:00Z',  # Sort key
  'student_id': 'student_123',
  'ai_feedback': '...',
  'teacher_feedback': '...',
  'difference_score': 0.85,
  'improvement_needed': 'Be less harsh'
}
```

**Setup:**
```bash
aws dynamodb create-table \
  --table-name feedback-patterns \
  --attribute-definitions \
    AttributeName=feedback_id,AttributeType=S \
    AttributeName=timestamp,AttributeType=S \
  --key-schema \
    AttributeName=feedback_id,KeyType=HASH \
    AttributeName=timestamp,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST
```

**Cost:** Free tier covers hackathon

---

### ML: SageMaker

**What it does:**
- Train and deploy ML models
- Risk prediction model
- Real-time inference

**Usage:**
```python
import boto3

sagemaker = boto3.client('sagemaker-runtime')

response = sagemaker.invoke_endpoint(
    EndpointName='risk-prediction-endpoint',
    ContentType='application/json',
    Body=json.dumps({
        'features': [
            commit_frequency,
            code_quality,
            engagement_score
        ]
    })
)

risk_score = json.loads(response['Body'].read())
```

**Setup:**
```bash
# Create SageMaker notebook
aws sagemaker create-notebook-instance \
  --notebook-instance-name education-ml \
  --instance-type ml.t3.medium
```

**Cost:** ~$0.05/hour for notebook (can be stopped)

---

### Monitoring: CloudWatch

**What it does:**
- Collect metrics
- View logs
- Set alarms
- Create dashboards

**Metrics to Track:**
```
- Lambda invocations
- Lambda duration
- Lambda errors
- API Gateway latency
- RDS CPU usage
- RDS connections
- Bedrock token usage
```

**Setup:**
```python
import boto3

cloudwatch = boto3.client('cloudwatch')

# Put custom metric
cloudwatch.put_metric_data(
    Namespace='EducationPlatform',
    MetricData=[
        {
            'MetricName': 'FeedbackQuality',
            'Value': 0.85,
            'Unit': 'None'
        }
    ]
)
```

**Cost:** Free tier covers hackathon

---

### Tracing: X-Ray

**What it does:**
- Distributed tracing
- See request flow
- Identify bottlenecks
- Debug issues

**Setup:**
```python
from aws_xray_sdk.core import xray_recorder
from aws_xray_sdk.core import patch_all

patch_all()

@xray_recorder.capture('generate_feedback')
def generate_feedback(code):
    # Your code here
    pass
```

**Cost:** Free tier covers hackathon

---

## 🚀 Quick Start: Deploy in 30 Minutes

### Step 1: Set Up AWS Account (5 min)
```bash
# Install AWS CLI
brew install awscli

# Configure credentials
aws configure
# Enter: Access Key ID
# Enter: Secret Access Key
# Enter: Region (us-east-1)
```

### Step 2: Create Lambda Function (10 min)
```bash
# Create function directory
mkdir feedback-generator
cd feedback-generator

# Create function code
cat > index.py << 'EOF'
import json
import boto3

bedrock = boto3.client('bedrock-runtime')

def lambda_handler(event, context):
    code = event['code']
    
    response = bedrock.invoke_model(
        modelId='anthropic.claude-3-sonnet-20240229-v1:0',
        body=json.dumps({
            'anthropic_version': 'bedrock-2023-06-01',
            'max_tokens': 1024,
            'messages': [{
                'role': 'user',
                'content': f'Analyze this code and provide feedback:\n{code}'
            }]
        })
    )
    
    return {
        'statusCode': 200,
        'body': response['body'].read()
    }
EOF

# Create deployment package
zip function.zip index.py

# Deploy to Lambda
aws lambda create-function \
  --function-name feedback-generator \
  --runtime python3.11 \
  --role arn:aws:iam::ACCOUNT:role/lambda-role \
  --handler index.lambda_handler \
  --zip-file fileb://function.zip
```

### Step 3: Create API Gateway (10 min)
```bash
# Create REST API
API_ID=$(aws apigateway create-rest-api \
  --name education-api \
  --query 'id' \
  --output text)

# Get root resource
ROOT_ID=$(aws apigateway get-resources \
  --rest-api-id $API_ID \
  --query 'items[0].id' \
  --output text)

# Create /feedback resource
RESOURCE_ID=$(aws apigateway create-resource \
  --rest-api-id $API_ID \
  --parent-id $ROOT_ID \
  --path-part feedback \
  --query 'id' \
  --output text)

# Create POST method
aws apigateway put-method \
  --rest-api-id $API_ID \
  --resource-id $RESOURCE_ID \
  --http-method POST \
  --authorization-type NONE

# Deploy API
aws apigateway create-deployment \
  --rest-api-id $API_ID \
  --stage-name prod
```

### Step 4: Test API (5 min)
```bash
# Get API endpoint
API_ENDPOINT="https://$API_ID.execute-api.us-east-1.amazonaws.com/prod"

# Test feedback generation
curl -X POST $API_ENDPOINT/feedback \
  -H "Content-Type: application/json" \
  -d '{"code": "def hello():\n    print(\"Hello\")"}'
```

---

## 💰 Cost Estimate (12-Hour Hackathon)

| Service | Usage | Cost |
|---------|-------|------|
| Lambda | 1000 invocations | Free |
| API Gateway | 1000 requests | Free |
| RDS | 12 hours | Free (t3.micro) |
| ElastiCache | 12 hours | Free (t3.micro) |
| DynamoDB | 1000 writes | Free |
| Bedrock | 100K tokens | ~$0.30 |
| SageMaker | 2 hours | ~$0.10 |
| CloudWatch | Logs + metrics | Free |
| **Total** | | **~$0.40** |

**You can build this for less than $1!**

---

## 🎯 AWS Services Checklist

- [ ] AWS Account created
- [ ] IAM roles configured
- [ ] Lambda functions deployed
- [ ] API Gateway created
- [ ] RDS PostgreSQL running
- [ ] ElastiCache Redis running
- [ ] DynamoDB tables created
- [ ] Bedrock access enabled
- [ ] SageMaker notebook created
- [ ] CloudWatch dashboards set up
- [ ] X-Ray tracing enabled
- [ ] All services connected

---

## 📊 Monitoring Dashboard

**Create CloudWatch dashboard:**

```bash
aws cloudwatch put-dashboard \
  --dashboard-name EducationPlatform \
  --dashboard-body '{
    "widgets": [
      {
        "type": "metric",
        "properties": {
          "metrics": [
            ["AWS/Lambda", "Invocations"],
            ["AWS/Lambda", "Duration"],
            ["AWS/Lambda", "Errors"],
            ["EducationPlatform", "FeedbackQuality"],
            ["EducationPlatform", "TeacherTime"],
            ["EducationPlatform", "AtRiskDetection"]
          ],
          "period": 300,
          "stat": "Average",
          "region": "us-east-1",
          "title": "Education Platform Metrics"
        }
      }
    ]
  }'
```

---

## 🚨 Troubleshooting

### Lambda Timeout
```
Increase timeout:
aws lambda update-function-configuration \
  --function-name feedback-generator \
  --timeout 60
```

### Bedrock Access Denied
```
Add Bedrock permissions to Lambda role:
aws iam attach-role-policy \
  --role-name lambda-role \
  --policy-arn arn:aws:iam::aws:policy/AmazonBedrockFullAccess
```

### RDS Connection Failed
```
Check security group:
aws ec2 describe-security-groups \
  --group-ids sg-12345678
```

---

## 🎉 You're Ready!

With this AWS tech stack, you can:
- ✅ Build a scalable backend
- ✅ Deploy AI models
- ✅ Monitor everything
- ✅ Handle real-time requests
- ✅ Store data securely
- ✅ Scale to millions of users

**All in 12 hours. All for less than $1.**

**Let's build! 🚀**
