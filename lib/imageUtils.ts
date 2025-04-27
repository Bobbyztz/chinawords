/**
 * Utility functions for handling images
 */

/**
 * Get random images from a specified folder
 * @param folderPath The path to the folder containing images (relative to public)
 * @param count The number of images to return
 * @returns Array of image paths
 */
export const getRandomImages = (folderPath: string, count: number): string[] => {
  // Define the available images in each folder
  const cityImages = [
    '书法.jpeg',
    '北京.jpeg',
    '沈阳.jpeg',
    '银川.jpeg',
    '上海.png',
    '兰州.png',
    '南京.png',
    '南宁.png',
    '南昌.png',
    '台北.png',
    '合肥.png',
    '天津.png',
    '太原.png',
    '广州.png',
    '成都.png',
    '拉萨.png',
    '昆明.png',
    '杭州.png',
    '武汉.png',
    '济南.png',
    '海口.png',
    '澳门.png',
    '福州.png',
    '西宁.png',
    '西安.png',
    '贵阳.png',
    '郑州.png',
    '重庆.png',
    '长春.png',
    '长沙.png',
    '香港.png',
    '哈尔滨.png',
    '石家庄.png',
    '乌鲁木齐.jpeg',
    '呼和浩特.png',
  ];

  const foodImages = [
    '北京.jpeg',
    '上海.png',
    '兰州.png',
    '南京.png',
    '南宁.png',
    '南昌.png',
    '台北.png',
    '合肥.png',
    '天津.png',
    '太原.png',
    '广州.png',
    '成都.png',
    '拉萨.png',
    '昆明.png',
    '杭州.png',
    '武汉.png',
    '沈阳.png',
    '济南.png',
    '海口.png',
    '澳门.png',
    '福州.png',
    '西宁.png',
    '西安.png',
    '贵阳.png',
    '郑州.png',
    '重庆.png',
    '银川.png',
    '长春.png',
    '长沙.png',
    '香港.png',
    '哈尔滨.png',
    '石家庄.png',
    '乌鲁木齐.png',
    '呼和浩特.png',
  ];

  // Select the appropriate image array based on the folder path
  const imageArray = folderPath.includes('3d') ? cityImages : foodImages;
  
  // Create a copy of the array to avoid modifying the original
  const availableImages = [...imageArray];
  
  // Shuffle the array using Fisher-Yates algorithm
  for (let i = availableImages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [availableImages[i], availableImages[j]] = [availableImages[j], availableImages[i]];
  }
  
  // Take the first 'count' images or all if there are fewer than 'count'
  const selectedImages = availableImages.slice(0, Math.min(count, availableImages.length));
  
  // Return the full paths to the images
  return selectedImages.map(image => `/${folderPath}/${image}`);
};
