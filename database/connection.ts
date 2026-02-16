
// Browser-compatible mock connection
// This replaces the real MongoDB connection to prevent "zstd.node" errors in the browser.
export const connectDB = async () => {
  console.log('✅ Local persistent storage initialized (Browser Mode)');
  return true;
};
