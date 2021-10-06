console.log('prod env');

const TOKEN = 'zqmEASANJHLCIPUqxsdTNVSK1_JgyNATZhAztIN2MQDXmoMU6VUAnQINGozZ9KOZ02UOnaadD24KhtuNI3aRGqK-O-UehUqUQL1fPbhvUZWTO52FFUmYScWk-1xvWO3StpxwOu59NpqjAOH6DE2vboYaF2FrD1VnOAfZJjYeu6-CPjQjENXy0IJtMbHU8O3CMK_Hg5SgDZi3_Q7-4yRh9CkmadCJO3nfjBiX6YF1eJoetbhVAt4PqJ7j8asTnCKXBuYeCqk6Cn9KasMILXlN8Ryf6B5lYB1zWfBFdmTPWCvqhSfPIPTCi_Dh9SPOGLhglERU8Q';

let pedidoCode = null;
let errorPayment = null;
let ordenData = {
    //"responseUrl": "http://payphone.local/payphone/finalizar",
    amount: 100,
    amountWithoutTax: 100,
    currency: "USD",
    clientTransactionId: "identifierUnique001"
};

function generarBoton(){

    payphone.Button({
        //token obtenido desde la consola de developer
        token: TOKEN,

        //PARÁMETROS DE CONFIGURACIÓN
        btnHorizontal: true,

        createOrder: function(actions){
            // console.log('createOrden');
            // console.log(ordenData.value);
            //Se ingresan los datos de la transaccion ej. monto
            return actions.prepare(ordenData)
                .then(function(response){
                        // console.log('response',response);
                        // console.log('paymentId',response.paymentId);
                        pedidoCode = response.paymentId;
                        return response;
                    })
                    .catch(function(err){
                        errorPayment = err;
                        // console.log('err',err);
                        return err;
                    });
        },
        onComplete: function(model, actions){

            console.log('model',model);
            console.log('actions',actions);

            //Se confirma el pago realizado
            actions.confirm({
                id: model.id,
                clientTxId: model.clientTxId
            }).then(function(value){

                //EN ESTA SECCIÓN SE PROCESA LA RESPUESTA CON LOS DATOS DE RESPUESTA                                   
                console.log('value');
                console.log(value);
                if (value.transactionStatus == "Approved"){
                    alert("Pago " + value.transactionId + " recibido, estado " + value.transactionStatus );
                }
            }).catch(function(err){
                console.log('error');
                console.log(err);
            });

        }
    }).render('#pp-button');
}

