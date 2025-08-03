# SSL Certificate Setup for Development

This project uses trusted SSL certificates for development to avoid browser security warnings.

## What Was Done

1. **Installed mkcert**: A simple tool for making locally-trusted development certificates
2. **Created Local CA**: Installed a local Certificate Authority trusted by your system
3. **Generated Certificates**: Created SSL certificates for localhost
4. **Configured React**: Set up the development server to use the custom certificates

## Certificate Files

- `certs/localhost+2.pem` - SSL certificate file
- `certs/localhost+2-key.pem` - SSL private key file

## Environment Variables

The following variables in `.env` configure SSL:

```properties
HTTPS=true
SSL_CRT_FILE=certs/localhost+2.pem
SSL_KEY_FILE=certs/localhost+2-key.pem
```

## Benefits

✅ **No Browser Warnings**: The certificates are trusted by your system  
✅ **Secure Development**: HTTPS ensures secure communication  
✅ **CORS Compliance**: Both React app and API use HTTPS  
✅ **Production-Like**: Mimics production HTTPS environment  

## Certificate Expiry

The certificates expire on **October 16, 2027**. When they expire, simply run:

```bash
cd "c:\Users\Mohammad\RiderProjects\test 2\my-react-app"
mkcert localhost 127.0.0.1 ::1
move localhost+2.pem certs\
move localhost+2-key.pem certs\
```

## Troubleshooting

If you still see SSL warnings:

1. **Clear Browser Cache**: Hard refresh (Ctrl+Shift+R)
2. **Check Certificate**: Ensure mkcert CA is installed with `mkcert -install`
3. **Restart Browser**: Close and reopen your browser
4. **Check Files**: Verify certificate files exist in `certs/` directory

## Team Setup

For other developers on your team:

1. They need to install mkcert: `winget install FiloSottile.mkcert`
2. Install the CA: `mkcert -install`
3. The certificate files in this repo will work for everyone

## Production

For production deployment, use proper SSL certificates from a Certificate Authority like Let's Encrypt, not these development certificates.
