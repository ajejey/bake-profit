# MongoDB Setup Guide for BakeProfit

## ✅ Why MongoDB?

- **Familiar:** You already know MongoDB
- **Free Tier:** MongoDB Atlas offers generous free tier (512MB storage)
- **Easy Setup:** No complex migrations
- **Flexible Schema:** Easy to add fields later
- **Auto-Indexing:** Mongoose handles indexes automatically

---

## 🚀 Quick Setup (MongoDB Atlas - Recommended)

### **Step 1: Create MongoDB Atlas Account**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up with Google or email
3. Choose "Free" tier (M0 Sandbox)

### **Step 2: Create a Cluster**

1. Click "Build a Database"
2. Choose "M0 FREE" tier
3. Select a cloud provider (AWS recommended)
4. Choose region closest to you
5. Cluster name: `BakeProfit` (or leave default)
6. Click "Create"

### **Step 3: Create Database User**

1. Security → Database Access
2. Click "Add New Database User"
3. Authentication Method: Password
4. Username: `bakeprofit_admin`
5. Password: Generate a strong password (save it!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### **Step 4: Whitelist IP Address**

1. Security → Network Access
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
   - **Production:** Add specific IP addresses
4. Click "Confirm"

### **Step 5: Get Connection String**

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Driver: Node.js
4. Version: 5.5 or later
5. Copy the connection string:
   ```
   mongodb+srv://bakeprofit_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your actual password
7. Add database name: `/bakeprofit` before the `?`
   ```
   mongodb+srv://bakeprofit_admin:yourpassword@cluster0.xxxxx.mongodb.net/bakeprofit?retryWrites=true&w=majority
   ```

### **Step 6: Add to .env.local**

Create `.env.local` in your project root:

```env
MONGODB_URI=mongodb+srv://bakeprofit_admin:yourpassword@cluster0.xxxxx.mongodb.net/bakeprofit?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### **Step 7: Test Connection**

```bash
npm run dev
```

Visit `http://localhost:3000/signup` and create an account. If successful, MongoDB is working!

---

## 🏠 Alternative: Local MongoDB

### **Windows**

1. Download MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Run installer (choose "Complete" installation)
3. Install as Windows Service
4. MongoDB Compass will be installed (GUI tool)

**Connection String:**
```env
MONGODB_URI=mongodb://localhost:27017/bakeprofit
```

### **Mac (Homebrew)**

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Connection String:**
```env
MONGODB_URI=mongodb://localhost:27017/bakeprofit
```

### **Linux (Ubuntu)**

```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

**Connection String:**
```env
MONGODB_URI=mongodb://localhost:27017/bakeprofit
```

---

## 📊 Database Structure

### **Collections (Auto-Created)**

1. **users**
   - Stores user accounts, authentication, subscription info
   - Indexes: email, google_id, stripe_customer_id

2. **usagetrackings**
   - Tracks monthly usage for free tier limits
   - Indexes: user_id + month (compound unique)

### **No Manual Setup Required!**

MongoDB and Mongoose automatically:
- ✅ Create collections on first insert
- ✅ Create indexes defined in schemas
- ✅ Validate data types
- ✅ Handle timestamps

---

## 🔍 View Your Data

### **MongoDB Atlas (Cloud)**

1. Go to your cluster
2. Click "Browse Collections"
3. Select database: `bakeprofit`
4. View collections: `users`, `usagetrackings`

### **MongoDB Compass (Local)**

1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Select database: `bakeprofit`
4. Browse collections

### **VS Code Extension**

1. Install "MongoDB for VS Code"
2. Connect to your database
3. Browse collections in sidebar

---

## 🐛 Troubleshooting

### **"MongoServerError: bad auth"**
- Check username and password in connection string
- Ensure password doesn't contain special characters (URL encode if needed)
- Verify database user was created

### **"MongooseServerSelectionError: connect ECONNREFUSED"**
- For Atlas: Check IP whitelist
- For local: Ensure MongoDB service is running
  - Windows: Check Services → MongoDB
  - Mac: `brew services list`
  - Linux: `sudo systemctl status mongod`

### **"Database not found"**
- MongoDB creates databases automatically on first write
- Create a user account to initialize the database

### **Connection string issues**
- Ensure no spaces in connection string
- Check database name is included: `/bakeprofit?`
- Verify password is URL-encoded if it contains special characters

---

## 🔐 Security Best Practices

### **Development**
- ✅ Use "Allow access from anywhere" for convenience
- ✅ Use strong passwords
- ✅ Don't commit `.env.local` to git

### **Production**
- ✅ Whitelist only your server's IP address
- ✅ Use environment variables (Vercel/Netlify)
- ✅ Enable MongoDB Atlas monitoring
- ✅ Set up automated backups
- ✅ Use separate database users for different environments

---

## 📈 Scaling

### **Free Tier Limits (M0)**
- Storage: 512 MB
- RAM: Shared
- Connections: 500
- **Perfect for:** Development, small apps, testing

**Estimated Capacity:**
- ~10,000 users
- ~100,000 recipes
- ~500,000 orders

### **When to Upgrade**
- Storage > 400 MB (80% of limit)
- Need dedicated resources
- Need automated backups
- Need advanced monitoring

**Next Tier:** M10 ($0.08/hour = ~$57/month)
- 10 GB storage
- 2 GB RAM
- Automated backups

---

## ✅ Verification Checklist

- [ ] MongoDB Atlas cluster created (or local MongoDB running)
- [ ] Database user created with password
- [ ] IP address whitelisted
- [ ] Connection string copied to `.env.local`
- [ ] `npm run dev` starts without errors
- [ ] Can create a user account at `/signup`
- [ ] User appears in MongoDB (Atlas UI or Compass)
- [ ] Can log in and access `/bakery-business-tool`

---

## 🎉 You're All Set!

MongoDB is now configured for BakeProfit. The database will automatically:
- Create collections when needed
- Add indexes for performance
- Validate data
- Handle timestamps

**Next Steps:**
1. Test authentication (signup/login)
2. Integrate limit checks into components
3. Add Google OAuth
4. Deploy to production

---

**Need Help?**
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- Mongoose Docs: https://mongoosejs.com/docs/
- BakeProfit Docs: See `AUTH_SETUP_GUIDE.md`
