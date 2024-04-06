async function fetchData() {
    try {
        const temp = await fetch(`./data/content.json`);
        const data = await temp.json();
        console.log(data)

        const title = document.querySelector('.dashboard-title');
        title.textContent = data.siteName;
        const navList = document.getElementById('navList');
        const infoCards = document.querySelector('.cards-section');
        const trendsSection = data.trendsSection;
        const additionalInfoItems = document.getElementById('trends-cards');

        data.sidebarMenu.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add('px-md-3', 'py-2');

            const link = document.createElement('a');
            link.href = item.url;
            link.classList.add('nav-link');
            link.dataset.bsToggle = "tooltip";
            link.dataset.bsPlacement = "right";
            link.title = item.text;
            link.setAttribute('aria-current', 'page');
            link.innerHTML = `
        <svg class="bi pe-none me-md-3" width="16" height="16">
            <use xlink:href="../icons/${item.text.toLowerCase()}.svg#${item.text.toLowerCase()}" fill="#9FA2B4" />
        </svg>
        <span>${item.text}</span>
    `;
            if (index === data.sidebarMenu.length - 2) {
                const hrElement = document.createElement('hr');
                hrElement.id = "sidebar-gray-line";
                navList.appendChild(hrElement);
            }

            listItem.appendChild(link);
            navList.appendChild(listItem);
        });

        data.infoCards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('col-xl', 'col-md-6', 'col-12');
            cardElement.innerHTML = `
                    <div class="card text-center">
                        <div class="card-body">
                            <h6 class="card-title gray-text mb-2">${card.title}</h6>
                            <span class="card-info mb-0">${card.value}</span>
                        </div>
                    </div>
                `;
            infoCards.appendChild(cardElement);
        });

        document.getElementById('trends-title').textContent = trendsSection.title;
        document.getElementById('trends-subtitle').textContent = trendsSection.timestamp;

        trendsSection.additionalInfo.forEach(info => {
            additionalInfoItems.innerHTML += `
                <div class="list-group-item list-group-item-action d-flex flex-column justify-content-center align-items-center p-4">
                    <h6 class="card-title gray-text mb-2">${info.title}</h6>
                    <span class="card-info h2 mb-0">${info.value}</span>
                </div>
            `;
        });

    } catch (error) {
        console.log(error);
    }
}

fetchData();