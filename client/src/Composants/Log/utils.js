export function populateDate() {
    const tab = [];
    for (let i = 1; i <= 31; i++) {
        tab.push(<option key={i} value={i}>{i}</option>);
    }

    const months = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    const tabMois = []
    for (let i = 0; i < months.length; i++) {
        tabMois.push(<option key={months[i]} value={months[i]}>{months[i]}</option>);
    }

    const currentYear = new Date().getFullYear();
    const tabAnnee = []
    for (let i = currentYear; i >= currentYear - 100; i--) {
        tabAnnee.push(<option key={i} value={i}>{i}</option>);
    }

    return [tab, tabMois, tabAnnee]
}