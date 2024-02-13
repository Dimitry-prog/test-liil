const root = document.querySelector('#root');

const services = [
    {
        "id": 1,
        "head": null,
        "name": "Проф.осмотр",
        "node": 0,
        "price": 100.0,
        "sorthead": 20
    },
    {
        "id": 2,
        "head": null,
        "name": "Хирургия",
        "node": 1,
        "price": 0.0,
        "sorthead": 10
    },
    {
        "id": 3,
        "head": 2,
        "name": "Удаление зубов",
        "node": 1,
        "price": 0.0,
        "sorthead": 10
    },
    {
        "id": 4,
        "head": 3,
        "name": "Удаление зуба",
        "node": 0,
        "price": 800.0,
        "sorthead": 10
    },
    {
        "id": 5,
        "head": 3,
        "name": "Удаление 8ого зуба",
        "node": 0,
        "price": 1000.0,
        "sorthead": 30
    },
    {
        "id": 6,
        "head": 3,
        "name": "Удаление осколка зуба",
        "node": 0,
        "price": 2000.0,
        "sorthead": 20
    },
    {
        "id": 7,
        "head": 2,
        "name": "Хирургические вмешательство",
        "node": 0,
        "price": 200.0,
        "sorthead": 10
    },
    {
        "id": 8,
        "head": 2,
        "name": "Имплантация зубов",
        "node": 1,
        "price": 0.0,
        "sorthead": 20
    },
    {
        "id": 9,
        "head": 8,
        "name": "Коронка",
        "node": 0,
        "price": 3000.0,
        "sorthead": 10
    },
    {
        "id": 10,
        "head": 8,
        "name": "Слепок челюсти",
        "node": 0,
        "price": 500.0,
        "sorthead": 20
    }
]

const fetchServices = async () => {
    const response = await fetch('api.json');
    const data = await response.json();
    return data.services;
};

const buildTree = (data, parentId) => {
    const ul = document.createElement('ul');
    ul.classList.add('list');
    const tree = data.filter(item => item.head === parentId).sort((a,b) => a.sorthead - b.sorthead);

    for (const branch of tree) {
        const li = document.createElement('li');
        const hasPrice = branch.price !== 0;
        li.textContent = hasPrice ? `${branch.name} $${branch.price}` : `${branch.name}`;
        li.classList.add('list__item', 'list__item_left');
        ul.appendChild(li);

        if (branch.head === null) {
            li.classList.remove('list__item_left');
        }

        if (branch.node === 1) {
            li.appendChild(buildTree(data, branch.id));
        }
    }

    return ul;
};

const renderTree = async () => {
    const data = await fetchServices();
    root.appendChild(buildTree(data, null));
};

renderTree();