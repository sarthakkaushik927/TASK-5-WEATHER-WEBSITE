import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authService from './services/authService.js';
import weatherService from './services/weatherService.js';
import User from './models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

async function testAllServices() {
  console.log('--- Testing Backend Services & APIs ---');
  try {
    await connectDB();
    console.log('✅ 1. MongoDB Connected.');

    // 2. Test Auth Signup
    const testEmail = `juniortest_${Date.now()}@example.com`;
    const testPassword = 'Password123!';
    const testName = 'Junior Developer Test';

    console.log(`\n✅ 2. Testing Signup (${testEmail})...`);
    const signupRes = await authService.signup({
      name: testName,
      email: testEmail,
      password: testPassword,
    });
    console.log('   Signup Status: SUCCESS');
    console.log('   User:', signupRes.user.name, signupRes.user.email);
    console.log('   JWT Token:', signupRes.token.substring(0, 25) + '...');

    // 3. Test Auth Login
    console.log(`\n✅ 3. Testing Login (${testEmail})...`);
    const loginRes = await authService.login({
      email: testEmail,
      password: testPassword,
    });
    console.log('   Login Status: SUCCESS');
    console.log('   Returned Token:', loginRes.token.substring(0, 25) + '...');

    // 4. Test Weather - Current
    console.log('\n✅ 4. Testing Weather Current API (London)...');
    const currentRes = await weatherService.getCurrent('London');
    console.log('   Current Weather Status: SUCCESS');
    console.log('   Location:', currentRes.location.name, currentRes.location.country);
    console.log('   Temp:', currentRes.current.temp_c, '°C', '| Condition:', currentRes.current.condition.text);

    // 5. Test Weather - Forecast
    console.log('\n✅ 5. Testing Weather Forecast API (London, 3 days)...');
    const forecastRes = await weatherService.getForecast('London', 3);
    console.log('   Forecast Weather Status: SUCCESS');
    console.log('   Forecast Days returned:', forecastRes.forecast.forecastday.length);

    // 6. Test Weather - Search
    console.log('\n✅ 6. Testing City Search API ("Lon")...');
    const searchRes = await weatherService.searchCity('Lon');
    console.log('   Search Status: SUCCESS');
    console.log('   Results found:', searchRes.map(item => item.name).join(', '));

    // Cleanup
    await User.deleteOne({ _id: loginRes.user._id });
    console.log('\n========================================');
    console.log('🎉 ALL BACKEND APIS & DB CONNECTIONS ARE WORKING PERFECTLY!');
    console.log('========================================');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ API Verification Failed:', error);
    process.exit(1);
  }
}

testAllServices();
