import connectDB from './mongodb';

export { connectDB };

/**
 * Initialize database connection
 * MongoDB automatically creates collections and indexes
 */
export async function initializeDatabase() {
  try {
    await connectDB();
    console.log('✅ MongoDB connected successfully');
    console.log('✅ Collections and indexes will be created automatically on first use');
    return { success: true };
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    throw error;
  }
}
