async function fetchData() {
    try {
        console.log("hola")
        const temp = await fetch("../data/content.json")
        const data = await temp.json();

        const title = document.querySelector('.dashboard-title');
        title.textContent = data.siteName;
        const navList = document.getElementById('navList');       


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


    } catch (error) {
        console.log(error);
    }
}

fetchData();