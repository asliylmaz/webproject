const data = [
    {
        id: 1,
        name: "Zeynep Kesken",
        position: 'Co-Founder',
        //src: '/img/team/4.png',
        social: [
            {title: "FB", url: "#0"},
            {title: "TW", url: "#0"},
            {title: "LN", url: "#0"}
        ]
    },  {
        id: 2,
        name: "Süleyman Derebaşı",
        position: 'Co-Founder',
        //src: '/img/team/5.png',
        social: [
            {title: "FB", url: "#0"},
            {title: "TW", url: "#0"},
            {title: "LN", url: "#0"}
        ]
    },

]

export const getTeamData = () => data;

export const getTeamItem = (value, whereName = "id") => {
    return data.find(item => item[whereName] === value);
};
