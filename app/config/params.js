export default {
    apiGateway: {
        URL: 'https://dy94jv89f6.execute-api.us-east-1.amazonaws.com/prod',
    },
    cognito: {
        USER_POOL_ID : 'us-east-1_BlIDDN1zx',
        APP_CLIENT_ID : '4hotbjah1tosm5n60o61pvs9ms',
        REGION: 'us-east-1',
        IDENTITY_POOL_ID : 'us-east-1:25f485fb-9863-4f2d-8afb-4fd47f45d6ff',
        MAX_ATTACHMENT_SIZE: 5000000,
    },
    s3: {
        BUCKET: 'serverless-notes-bucket'
    }
};