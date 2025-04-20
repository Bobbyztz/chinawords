#!/bin/bash

# Script to rename files by removing the "-twi" suffix

# Directory containing the files
DIR="public/34个省级行政区-3d"

# Find all files with "-twi.png" suffix
for file in "$DIR"/*-twi.png; do
    # Get the base name of the file
    base=$(basename "$file")
    
    # Create the new name by removing "-twi" from the filename
    new_name="${base/-twi.png/.png}"
    
    # Full path for the new file
    new_file="$DIR/$new_name"
    
    # Rename the file
    echo "Renaming $file to $new_file"
    mv "$file" "$new_file"
done

echo "Renaming complete!"
