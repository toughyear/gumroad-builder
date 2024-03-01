#!/bin/bash
# Usage
# ./extract_text_files.sh <directory_path>

# Check if a directory path is provided
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <directory_path>"
  exit 1
fi

# The directory to search in
DIR_PATH=$1

# Output file
OUTPUT_FILE="output.txt"

# Empty the output file if it already exists
> $OUTPUT_FILE

# Supported file extensions
EXTENSIONS=("js" "jsx" "ts" "tsx" "md" "html" "css")

# Find and process files
find $DIR_PATH -type f \( $(printf -- "-name *.%s -o " "${EXTENSIONS[@]}"; echo "-name *.${EXTENSIONS[-1]}") \) | while read file; do
  echo "// $file" >> $OUTPUT_FILE
  cat "$file" >> $OUTPUT_FILE
  echo "" >> $OUTPUT_FILE # Add a newline for readability
done

echo "Processing completed. Output is in $OUTPUT_FILE"
