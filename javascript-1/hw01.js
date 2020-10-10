/*
Course: OTUS JS Developer Professional
Student: Grigori Barbachov
Homework: #1
*/

const maxItemAssociation = (history) => {    
    // Lookup DS to store which customers bought each item
    let customers = {};
    history.forEach( (purchases, customer) => {
        purchases.forEach( good => {
            customers[good] ? customers[good].push(customer) : customers[good] = [customer];
        });
    });

    // create list of suggestions for each customer (start with own purchases)
    let result = history.map( el => el.slice() );

    // expand list of suggestions for each customer until no longer possible
    result.forEach( (goods, customer) => {
        goods.forEach( good => {
            customers[good].forEach( anotherCustomer => {
                if (anotherCustomer !== customer) {
                    history[anotherCustomer].forEach( relatedPurchase => {
                        if ( !goods.includes(relatedPurchase) )
                            result[customer].push(relatedPurchase);
                    });
                }
            });
        });
    });

    // keep only groups of suggestions of max length
    const maxLength = Math.max(...result.map( el => el.length ));
    const suggestions = result.filter( el => el.length === maxLength );
    
    // sort each group in lexicographical order
    // then sort entire list in lexicographical order
    // and return lexicographically smallest element
    return suggestions.map( el => el.sort() ).sort()[0];
}
