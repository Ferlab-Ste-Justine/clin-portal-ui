// cypress/support/utils.ts

// Fonction pour obtenir les variables de date et d'heure
export const getDateTime = () => {
    const date = new Date();
    const joinWithPadding = (l: number[]) => l.reduce((xs, x) => xs + `${x}`.padStart(2, '0'), '');
    const strDate = joinWithPadding([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
    const strTime = joinWithPadding([date.getHours(), date.getMinutes()]);
  
    // Retourner les variables de date et d'heure
    return { strDate, strTime };
  };
  