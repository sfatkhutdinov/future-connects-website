# Domain Setup Instructions for Future Connects

## Resend Domain Verification Setup

### 1. Resend Dashboard Setup
1. Go to: https://resend.com/domains
2. Click "Add Domain"
3. Enter: `future-connects.com`
4. Select "DNS verification"

### 2. DNS Records to Add
Add these records to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.):

**Domain Verification:**
```
Type: TXT
Name: @ (or root domain)
Value: [Provided by Resend - looks like: resend-verification=abc123...]
```

**DKIM Authentication:**
```
Type: TXT
Name: resend._domainkey
Value: [Long DKIM key provided by Resend]
```

**DMARC Policy:**
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none;
```

**SPF Record (if not exists):**
```
Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all
```

### 3. Verification Timeline
- **Immediate**: Some DNS providers (Cloudflare)
- **15-60 minutes**: Most DNS providers
- **Up to 48 hours**: Maximum propagation time

### 4. Verification Status
Check verification status at: https://resend.com/domains

### 5. Production Configuration
Once verified, update environment variables:

```env
# Production Email Configuration
RESEND_API_KEY=your_resend_api_key
ADMIN_EMAIL=contact@future-connects.com
FROM_EMAIL=noreply@future-connects.com
```

## Common DNS Providers

### Cloudflare DNS
1. Go to Cloudflare Dashboard
2. Select your domain
3. Go to DNS > Records
4. Add each TXT record as specified

### GoDaddy
1. Go to GoDaddy DNS Management
2. Add TXT records in DNS settings
3. Use @ for root domain records

### Namecheap
1. Go to Domain List > Manage
2. Advanced DNS tab
3. Add TXT records as specified

## Troubleshooting
- **Records not found**: Wait longer for DNS propagation
- **Verification failed**: Double-check record values (no extra spaces)
- **Still not working**: Use DNS checker tools like whatsmydns.net

## Next Steps After Verification
1. Test email sending with custom domain
2. Update email templates with proper branding
3. Configure production environment variables
4. Test both admin and customer email flows
