const filterButtons = document.querySelectorAll('.filter-btn');
		const galleryItems = [...document.querySelectorAll('.gallery-item')];
		const lightbox = document.querySelector('.lightbox');
		const lightboxImage = lightbox.querySelector('img');
		const lightboxCaption = lightbox.querySelector('figcaption');
		const menuToggle = document.querySelector('.menu-toggle');
		const navigation = document.querySelector('.nav');
		let activePhotos = galleryItems;
		let activeIndex = 0;
		let lastFocusedElement;

		filterButtons.forEach((button) => {
			button.addEventListener('click', () => {
				filterButtons.forEach((item) => {
					const isActive = item === button;
					item.classList.toggle('active', isActive);
					item.setAttribute('aria-pressed', String(isActive));
				});
				galleryItems.forEach((photo) => {
					photo.hidden = button.dataset.filter !== 'all' && photo.dataset.category !== button.dataset.filter;
				});
			});
		});

		function showPhoto(index) {
			activeIndex = (index + activePhotos.length) % activePhotos.length;
			const photo = activePhotos[activeIndex];
			lightboxImage.src = photo.querySelector('img').src.replace(/w=\d+/, 'w=1800');
			lightboxImage.alt = photo.querySelector('img').alt;
			lightboxCaption.textContent = photo.dataset.title;
		}

		function closeLightbox() {
			lightbox.classList.remove('open');
			document.body.classList.remove('no-scroll');
			lastFocusedElement?.focus();
		}

		galleryItems.forEach((photo) => {
			photo.addEventListener('click', () => {
				activePhotos = galleryItems.filter((item) => !item.hidden);
				activeIndex = activePhotos.indexOf(photo);
				lastFocusedElement = photo;
				showPhoto(activeIndex);
				lightbox.classList.add('open');
				document.body.classList.add('no-scroll');
				lightbox.querySelector('.lightbox-close').focus();
			});
		});

		lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
		lightbox.querySelector('.lightbox-prev').addEventListener('click', () => showPhoto(activeIndex - 1));
		lightbox.querySelector('.lightbox-next').addEventListener('click', () => showPhoto(activeIndex + 1));
		lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
		document.addEventListener('keydown', (event) => {
			if (!lightbox.classList.contains('open')) return;
			if (event.key === 'Escape') closeLightbox();
			if (event.key === 'ArrowLeft') showPhoto(activeIndex - 1);
			if (event.key === 'ArrowRight') showPhoto(activeIndex + 1);
		});

		menuToggle.addEventListener('click', () => {
			const isOpen = navigation.classList.toggle('open');
			menuToggle.setAttribute('aria-expanded', String(isOpen));
			menuToggle.setAttribute('aria-label', isOpen ? 'Tutup navigasi' : 'Buka navigasi');
		});
		navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
			navigation.classList.remove('open');
			menuToggle.setAttribute('aria-expanded', 'false');
			menuToggle.setAttribute('aria-label', 'Buka navigasi');
		}));
