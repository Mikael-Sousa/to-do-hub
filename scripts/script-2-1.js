let week = JSON.parse(localStorage.getItem("week")) || {
                        S1: 0,
                        M: 0,
                        T: 0,
                        W: 0,
                        T2: 0,
                        F: 0,
                        S2: 0
                    };

                    const rateDay =
                        Number(localStorage.getItem("rateDay")) || 0;
                    let today = new Date();
                    let dayWeek = today.getDay();

                    switch (dayWeek) {
                        case 0:
                            week.S1 = rateDay;
                            break;
                        case 1:
                            week.M = rateDay;
                            break;
                        case 2:
                            week.T = rateDay;
                            break;
                        case 3:
                            week.W = rateDay;
                            break;
                        case 4:
                            week.T2 = rateDay;
                            break;
                        case 5:
                            week.F = rateDay;
                            break;
                        case 6:
                            week.S2 = rateDay;
                            break;
                        default:
                            console.log("erro");
                    }

                    localStorage.setItem("week", JSON.stringify(week));

                    console.log("Semana atualizada:", week);