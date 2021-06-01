import React from 'react';
import { Select } from 'antd';
import { Tag } from 'antd';
const { Option } = Select;

function handleChange(value) {
    console.log(`selected ${value}`);
}

export const columns = [

    {
        title: 'Id',
        dataIndex: "id",
        key: 0,
        sorter: (a, b) => a.id - b.id,
        sortDirections: ['descend', 'ascend'],
        width:'2%',
    },
    {
        title: 'Aperçu',
        dataIndex: 'aperçu',
        key:0,
        render: image => <img  src={image} className={"img_aperçu"}/>,
    },
    {
        title: 'Titre',
        dataIndex: 'titre',
        key: 0,
        sorter: (a, b) => a.id - b.id,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 0,
        sorter: (a, b) => a.id - b.id,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Etat',
        dataIndex: 'tags',
        key: 'tags',
        sorter: (a, b) => a.id - b.id,
        sortDirections: ['descend', 'ascend'],
        render: tags => (
            <span>
        {tags.map(tag => {
            //console.log("taaatgs",tag)
            let color = tag.length > 5 ? 'green' : 'green';
            if (tag === 'En cours') {
                color = 'green';
            }else if(tag === 'A venir'){
                color = 'blue'
            }else if(tag === 'Archivé'){
                color = 'geekblue'
            }
            return (
                <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                </Tag>
            );
        })}
      </span>
        ),

    },

];


export const data = {
    totalElements:20,
    content:[
        {
            id:1,
            aperçu:"https://www.cieau.com/wp-content/uploads/2019/11/eau_nature.jpg",
            titre:"Dreamy.mp4",
            date:"16/03/2021\n" +
                "09:30:00",
            tags: ['En cours'],

        },
        {
            id:2,
            aperçu:"https://www.cieau.com/wp-content/uploads/2019/11/eau_nature.jpg",
            titre:"Dreamy.mp4",
            date:"16/03/2021\n" +
                "09:30:00",
            tags: ['En cours'],

        },
        {
            id:3,
            aperçu:"https://www.cieau.com/wp-content/uploads/2019/11/eau_nature.jpg",
            titre:"Dreamy.mp4",
            date:"16/03/2021\n" +
                "09:30:00",
            tags: ['A venir'],

        },
        {
            id:4,
            aperçu:"https://www.cieau.com/wp-content/uploads/2019/11/eau_nature.jpg",
            titre:"Dreamy.mp4",
            date:"16/03/2021\n" +
                "09:30:00",
            tags: ['Archivé'],

        },
        {
            id:5,
            aperçu:"https://www.cieau.com/wp-content/uploads/2019/11/eau_nature.jpg",
            titre:"Dreamy.mp4",
            date:"16/03/2021\n" +
                "09:30:00",
            tags: ['En cours'],

        },
        {
            id:6,
            aperçu:"https://www.cieau.com/wp-content/uploads/2019/11/eau_nature.jpg",
            titre:"Dreamy.mp4",
            date:"16/03/2021\n" +
                "09:30:00",
            tags: ['En cours'],
        },
        {
            id:7,
            aperçu:"https://www.cieau.com/wp-content/uploads/2019/11/eau_nature.jpg",
            titre:"Dreamy.mp4",
            date:"16/03/2021\n" +
                "09:30:00",
            tags: ['En cours'],

        },
        {
            id:8,
            aperçu:"https://www.cieau.com/wp-content/uploads/2019/11/eau_nature.jpg",
            titre:"Dreamy.mp4",
            date:"16/03/2021\n" +
                "09:30:00",
            tags: ['En cours'],

        },
        {
            id:9,
            aperçu:"https://www.cieau.com/wp-content/uploads/2019/11/eau_nature.jpg",
            titre:"Dreamy.mp4",
            date:"16/03/2021\n" +
                "09:30:00",
            tags: ['En cours'],

        },
        {
            id:10,
            aperçu:"https://www.cieau.com/wp-content/uploads/2019/11/eau_nature.jpg",
            titre:"Dreamy.mp4",
            date:"16/03/2021\n" +
                "09:30:00",
            tags: ['En cours'],

        },
        {
            id:11,
            aperçu:"https://www.cieau.com/wp-content/uploads/2019/11/eau_nature.jpg",
            titre:"Dreamy.mp4",
            date:"16/03/2021\n" +
                "09:30:00",
            tags: ['En cours'],

        },
        {
            id:12,
            aperçu:"https://www.cieau.com/wp-content/uploads/2019/11/eau_nature.jpg",
            titre:"Dreamy.mp4",
            date:"16/03/2021\n" +
                "09:30:00",
            tags: ['En cours'],

        },
        {
            id:13,
            aperçu:"https://www.cieau.com/wp-content/uploads/2019/11/eau_nature.jpg",
            titre:"Dreamy.mp4",
            date:"16/03/2021\n" +
                "09:30:00",
            tags: ['En cours'],
        },
        {
            id:14,
            aperçu:"https://www.cieau.com/wp-content/uploads/2019/11/eau_nature.jpg",
            titre:"Dreamy.mp4",
            date:"16/03/2021\n" +
                "09:30:00",
            tags: ['En cours'],

        },
        {
            id:15,
            aperçu:"https://www.cieau.com/wp-content/uploads/2019/11/eau_nature.jpg",
            titre:"Dreamy.mp4",
            date:"16/03/2021\n" +
                "09:30:00",
            tags: ['En cours'],

        },
        {
            id:16,
            aperçu:"https://www.cieau.com/wp-content/uploads/2019/11/eau_nature.jpg",
            titre:"Dreamy.mp4",
            date:"16/03/2021\n" +
                "09:30:00",
            tags: ['En cours'],

        },
        {
            id:17,
            aperçu:"https://www.cieau.com/wp-content/uploads/2019/11/eau_nature.jpg",
            titre:"Dreamy.mp4",
            date:"16/03/2021\n" +
                "09:30:00",
            tags: ['En cours'],

        },
        {
            id:18,
            aperçu:"https://www.cieau.com/wp-content/uploads/2019/11/eau_nature.jpg",
            titre:"Dreamy.mp4",
            date:"16/03/2021\n" +
                "09:30:00",
            tags: ['En cours'],

        },
        {
            id:19,
            aperçu:"https://www.cieau.com/wp-content/uploads/2019/11/eau_nature.jpg",
            titre:"Dreamy.mp4",
            date:"16/03/2021\n" +
                "09:30:00",
            tags: ['En cours'],
        },
        {
            id:20,
            aperçu:"https://www.cieau.com/wp-content/uploads/2019/11/eau_nature.jpg",
            titre:"Dreamy.mp4",
            date:"16/03/2021\n" +
                "09:30:00",
            tags: ['En cours'],

        },
    ]
}
