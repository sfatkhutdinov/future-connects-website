const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to replace 'font-medium' with 'fw-medium' in a file
function replaceFontMediumInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Skip files that don't contain 'font-medium'
    if (!content.includes('font-medium')) {
      return false;
    }
    
    // Replace 'font-medium' with 'fw-medium' in className attributes
    const updatedContent = content.replace(/className="([^"]*)font-medium([^"]*)"/g, 'className="$1fw-medium$2"');
    
    // Save the file only if changes were made
    if (updatedContent !== content) {
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    return false;
  }
}

// Start the replacement process
console.log('Starting the replacement of font-medium with fw-medium...');

// Find all .tsx and .jsx files in the src directory
const findCommand = 'find src -type f -name "*.tsx" -o -name "*.jsx"';
let filesChanged = 0;

try {
  const result = execSync(findCommand, { encoding: 'utf8' });
  const files = result.trim().split('\n').filter(file => file);
  
  console.log(`Found ${files.length} files to process.`);
  
  // Process each file
  files.forEach(file => {
    const wasChanged = replaceFontMediumInFile(file);
    if (wasChanged) {
      console.log(`Updated: ${file}`);
      filesChanged++;
    }
  });
  
  console.log(`Replacement completed. Modified ${filesChanged} files.`);
} catch (error) {
  console.error('Error during the replacement process:', error);
} 