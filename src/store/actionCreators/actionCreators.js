import gridcolors from '../../util/gridcolors';

export const fetchApplicationDataHandler = () => {

    return dispatch => {
        
        let dataURLs = [
                        'https://api.coinmarketcap.com/v2/ticker/1/',
                        'https://api.coindesk.com/v1/bpi/historical/close.json',
                        'https://api.coinmarketcap.com/v2/ticker/?structure=array'
                       ];

        Promise.all(dataURLs.map(fetch))
               .then(promises => Promise.all(promises.map(res => res.json())))
               .then(data => {

                   let bitcoinData = data[0].data.quotes[Object.keys(data[0].data.quotes)[0]];
                   let lastMonthData = data[1].bpi;
                   let topCryptoCurrencyData = [];
                   let lastMonthSortedDataArray = [];

                   Object.keys(lastMonthData).forEach((key, index) => {
                        
                        let key_data = lastMonthData[key];

                            lastMonthSortedDataArray.push({ 
                                                            x: Math.log10(parseFloat(key_data).toFixed(2)),
                                                            y: index 
                                                          });
                    });

                    data[2].data.forEach(data => {

                        topCryptoCurrencyData.push({
                            data, color: gridcolors[parseInt(Math.floor(Math.random() * gridcolors.length))] 
                        });
                    });

                   dispatch({ type: 'APPLICATION_DATA->FETCH::SUCCESS',
                              bitcoinData,
                              lastMonthBitcoinData: lastMonthSortedDataArray,
                              topCryptoCurrencyData });

            }).catch(error => dispatch({ type: 'APPLICATION_DATA->FETCH::FAILED', error }));
    }
};

export const refetchApplicationDataHandler = () => {

    return { type: 'APPLICATION_DATA->RE-FETCH::INITIALIZE' };
};
