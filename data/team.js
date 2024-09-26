import { useTranslation } from 'react-i18next';

const data = (t) => [
    {
        id: 1,
        name: "Zeynep Kesken",
        position: t('positions.coFounder'),  // Dil dosyasından çekiliyor
        //src: '/img/team/4.png',
        social: [
            { title: "IN", url: "#0" },
            { title: "TW", url: "#0" }
        ]
    }, {
        id: 2,
        name: "Süleyman Derebaşı",
        position: t('positions.coFounder'),  // Dil dosyasından çekiliyor
        //src: '/img/team/5.png',
        social: [
            { title: "IN", url: "#0" },
            { title: "TW", url: "#0" }
        ]
    },
]

export const getTeamData = () => {
    const { t } = useTranslation();
    return data(t);
};

export const getTeamItem = (value, whereName = "id") => {
    const { t } = useTranslation();
    return data(t).find(item => item[whereName] === value);
};
