import PubSub from 'pubsub-js';

export default class TratadorErros {

    constructor() {
        
        // super();
    }

    publicaErros(json) {
       json.errors.forEach(item => {
           PubSub.publish('mostra-erro', item)
       });
    }
}