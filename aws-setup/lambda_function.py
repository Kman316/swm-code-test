import json
import boto3

def lambda_handler(event, context):
    s3 = boto3.client('s3')
    bucket_name = 'my-test-news'
    key = 'news.json'

    try:
        response = s3.get_object(Bucket=bucket_name, Key=key)
        data = response['Body'].read().decode('utf-8')
        json_data = json.loads(data)

        return {
            'statusCode': 200,
            'body': json.dumps(json_data),
            'headers': {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
