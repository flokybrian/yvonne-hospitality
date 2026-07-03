/**
 * Upload all media files to Cloudinary
 * 
 * Prerequisites:
 * 1. npm install cloudinary dotenv
 * 2. Add Cloudinary credentials to backend/.env
 * 
 * Run: node scripts/upload-to-cloudinary.js
 */

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../backend/.env') });

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const FOLDER_PREFIX = 'yvonne-hospitality';

// Files to upload
const uploads = [
    // Gallery images
    { local: '../MY PICTURES/FOOD1.PNG.jpeg', folder: 'gallery', public_id: 'food1', resource_type: 'image' },
    { local: '../MY PICTURES/FOOD2.PNG.jpeg', folder: 'gallery', public_id: 'food2', resource_type: 'image' },
    { local: '../MY PICTURES/PROFILE PICTURE.PNG.jpeg', folder: 'gallery', public_id: 'profile', resource_type: 'image' },
    
    // Videos
    { local: '../MY VIDEOS/WhatsApp Video 2026-07-03 at 10.42.42.mp4', folder: 'videos', public_id: 'video1', resource_type: 'video' },
    { local: '../MY VIDEOS/WhatsApp Video 2026-07-03 at 10.42.42 (1).mp4', folder: 'videos', public_id: 'video2', resource_type: 'video' },
    { local: '../MY VIDEOS/WhatsApp Video 2026-07-03 at 10.42.43.mp4', folder: 'videos', public_id: 'video3', resource_type: 'video' },
];

async function uploadFile(fileConfig) {
    const localPath = path.join(__dirname, fileConfig.local);
    const cloudinaryPath = `${FOLDER_PREFIX}/${fileConfig.folder}/${fileConfig.public_id}`;

    console.log(`\nUploading: ${fileConfig.local}`);
    console.log(`       to: ${cloudinaryPath}`);

    try {
        const result = await cloudinary.uploader.upload(localPath, {
            folder: `${FOLDER_PREFIX}/${fileConfig.folder}`,
            public_id: fileConfig.public_id,
            resource_type: fileConfig.resource_type,
            overwrite: true,
            // Optimization options
            quality: 'auto:good',
            fetch_format: 'auto',
        });

        console.log(`✅ Success: ${result.secure_url}`);
        return {
            success: true,
            url: result.secure_url,
            public_id: result.public_id,
            width: result.width,
            height: result.height,
            size: result.bytes,
            format: result.format
        };
    } catch (error) {
        console.error(`❌ Failed: ${error.message}`);
        return { success: false, error: error.message };
    }
}

async function main() {
    console.log('==========================================');
    console.log('  Cloudinary Upload Script');
    console.log('==========================================');
    console.log(`Cloud: ${process.env.CLOUDINARY_CLOUD_NAME}`);
    console.log(`Folder: ${FOLDER_PREFIX}`);
    console.log('==========================================\n');

    const results = [];

    for (const file of uploads) {
        const result = await uploadFile(file);
        results.push({ ...file, ...result });
        
        // Small delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Summary
    console.log('\n==========================================');
    console.log('  Upload Summary');
    console.log('==========================================');
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    console.log(`✅ Successful: ${successful}`);
    console.log(`❌ Failed: ${failed}`);
    console.log('==========================================\n');

    // Write URLs to a JSON file for easy import
    const urlMap = results
        .filter(r => r.success)
        .reduce((acc, r) => {
            acc[`${r.folder}_${r.public_id}`] = r.url;
            return acc;
        }, {});

    fs.writeFileSync(
        path.join(__dirname, 'cloudinary-urls.json'),
        JSON.stringify(urlMap, null, 2)
    );
    console.log('URLs saved to: scripts/cloudinary-urls.json\n');
}

main().catch(console.error);
