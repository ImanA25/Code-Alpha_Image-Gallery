// script.js
// Sample image data - Fixed URLs and category names to match filter buttons
const images = [
    { id: 1, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0WcT_YUlBjCNGwuRwscFma7hALhDZ-WAbFw&s', title: 'Mountain Landscape', category: 'nature' },
    { id: 2, src: 'https://i0.wp.com/globalgrasshopper.com/wp-content/uploads/2024/12/Bangkok-Skyline.jpg?resize=840%2C561&ssl=1', title: 'City Skyline', category: 'urban' },
    { id: 3, src: 'https://images.immediate.co.uk/production/volatile/sites/30/2022/05/Chocolate-sandwich-cupcakes-4b30ada.jpg?quality=90&resize=708,643', title: 'Desert', category: 'food' },
    { id: 4, src: 'https://oshiprint.in/image/cache/catalog/poster/new/mqp889-1100x733.jpeg.webp', title: 'Rabbit', category: 'animal' },
    { id: 5, src: 'https://images.theconversation.com/files/582457/original/file-20240318-30-u9p8j6.jpg?ixlib=rb-4.1.0&rect=26%2C31%2C3000%2C1500&q=45&auto=format&w=1356&h=668&fit=crop', title: 'Ocean Waves', category: 'nature' },
    { id: 6, src: 'https://www.arch2o.com/wp-content/uploads/2022/10/Arch2O-10-of-the-most-eye-opening-iconic-buildings-of-modern-architecture.jpg', title: 'Modern Architecture', category: 'urban' },
    { id: 7, src: 'https://insanelygoodrecipes.com/wp-content/uploads/2022/02/Homemade-Spicy-Chili-Chicken-with-Sesame-Seeds-with-Green-Onions-683x1024.jpg', title: 'Spicy', category: 'food' },
    { id: 8, src: 'https://assets.farmsanctuary.org/content/uploads/2025/05/15062015/2024_04-19_FSNY_Margaretta_lamb_LH_4565-1600x1065.jpg', title: 'Lamb', category: 'animal' },
    { id: 9, src: 'https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg', title: 'Forest Path', category: 'nature' },
    { id: 10, src: 'https://i.redd.it/ki34g7cl98ca1.jpg', title: 'Night City', category: 'urban' },
    { id: 11, src: 'https://img.delicious.com.au/5Ao_Xcis/del/2017/10/berry-trifles-53770-2.jpg', title: 'Dessert', category: 'food' },
    { id: 12, src: 'https://www.vets4pets.com/siteassets/species/cat/kitten/tiny-kitten-in-sunlight.jpg', title: 'Kitten', category: 'animal' },
    { id: 13, src: 'https://i.natgeofe.com/n/66cf3478-160b-487e-a627-05b012381f0e/liwa-oasis-sand-dunes-dubai-590.jpg', title: 'Desert Dunes', category: 'nature' },
    { id: 14, src: 'https://i.pinimg.com/736x/9c/ac/fb/9cacfbb8e49ca026c53797fed4e6ff3f.jpg', title: 'Bently', category: 'car' },
    { id: 15, src: 'https://static.wixstatic.com/media/44d6a9_da12c092855a49539bdd553c705dfbea~mv2.jpg/v1/fill/w_980,h_980,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/44d6a9_da12c092855a49539bdd553c705dfbea~mv2.jpg', title: 'Spicy', category: 'food' }, 
    { id: 16, src: 'https://www.shutterstock.com/image-photo/beautiful-horse-running-autumn-600nw-2430263853.jpg', title: 'Horse', category: 'animal' },
    { id: 17, src: 'https://dbz-images.dubizzle.com/images/2024/10/07/7e04ac190e204c4ba6060f5e7cca6ca2-.jpeg?impolicy=dpv', title: 'Mercedes-Benz G-class', category: 'car' },
    { id: 18, src: 'https://media.istockphoto.com/id/155288168/photo/max-patch-sunset.jpg?s=612x612&w=0&k=20&c=kS0FyNaQguD3PhpYnvfl6SbYtJw0CiItKDxx5lDxGU4=', title: 'Sunset Over Mountains', category: 'nature' },
    { id: 19, src: 'https://thumbs.dreamstime.com/b/sun-set-22066345.jpg', title: 'Urban Sunset', category: 'urban' },
    { id: 20, src: 'https://assets.epicurious.com/photos/62d6c513077a952f4a8c338c/16:9/w_4039,h_2272,c_limit/PannaCotta_RECIPE_04142022_9822_final.jpg', title: 'Dessert', category: 'food' },
    { id: 21, src: 'https://images.photowall.com/products/57551/mountain-stream.jpg?h=699&q=85', title: 'Mountain Stream', category: 'nature' },
    { id: 22, src: 'https://i.pinimg.com/736x/d1/f0/ae/d1f0ae68372cd580cd96399c1cd157d8.jpg', title: 'BMW', category: 'car' }
];
// DOM elements
const galleryGrid = document.getElementById('galleryGrid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxCategory = document.getElementById('lightboxCategory');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Current state
let currentIndex = 0;
let filteredImages = [...images];

// Initialize gallery
function initGallery() {
    renderGallery(filteredImages);
    setupEventListeners();
}

// Render gallery items
function renderGallery(imagesToRender) {
    galleryGrid.innerHTML = '';
    imagesToRender.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.index = index;
        galleryItem.dataset.category = image.category;
        
        galleryItem.innerHTML = `
            <img src="${image.src}" alt="${image.title}" />
            <div class="item-overlay">
                <div class="item-title">${image.title}</div>
                <div class="item-category">${image.category.charAt(0).toUpperCase() + image.category.slice(1)}</div>
            </div>
        `;
        
        galleryGrid.appendChild(galleryItem);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Gallery item click
    galleryGrid.addEventListener('click', (e) => {
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem) {
            const index = parseInt(galleryItem.dataset.index);
            openLightbox(index);
        }
    });

    // Lightbox controls
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    showPrevImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }
    });

    // Filter buttons - SELECT THEM AFTER DOM IS READY
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter images
            const filter = btn.dataset.filter;
            if (filter === 'all') {
                filteredImages = [...images];
            } else {
                filteredImages = images.filter(img => img.category === filter);
            }
            
            renderGallery(filteredImages);
        });
    });

    // Close lightbox when clicking outside
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Lightbox functions
function openLightbox(index) {
    currentIndex = index;
    const image = filteredImages[index];
    
    lightboxImg.src = image.src;
    lightboxTitle.textContent = image.title;
    lightboxCategory.textContent = image.category.charAt(0).toUpperCase() + image.category.slice(1);
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showPrevImage() {
    currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    updateLightbox();
}
function showNextImage() {
    currentIndex = (currentIndex + 1) % filteredImages.length;
    updateLightbox();
}

function updateLightbox() {
    const image = filteredImages[currentIndex];
    lightboxImg.src = image.src;
    lightboxTitle.textContent = image.title;
    lightboxCategory.textContent = image.category.charAt(0).toUpperCase() + image.category.slice(1);
}

// Initialize the gallery when page loads
document.addEventListener('DOMContentLoaded', initGallery);