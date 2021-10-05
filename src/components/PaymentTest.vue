<template>
    <div>
        <form >
            <div>
                <label for="token">Token</label>
                <input type="text" v-model="token" required>
            </div>
        </form>
    </div>
</template>
<script>

import { ref } from '@vue/composition-api';

export default {
    setup() {
        const token = '_ASggLu6A1EpYbBzNbK1qOJPqbIjKFZrWVDbLFG4yb_qCZqs98vdMTSaE6h7wAgwRd-gxt45sudMbRjSGfkXlwW3mD36oZOaxM9CuSoqI3bGGlwuzHaHR6NnTBiUi0O2wmfRm1-zLtIl0gIG7L093FNYj1v1DxVboRpm-5J2UB7XTxvBo0Yjxmt-XG6xR_cAm0-fFz8GxPmEbxa_0a8Sl7fWLLcd6gS7HI5_RbGhzg_XmZE3dK4fslDIAm8N6XNqgxrEWbuayXJvSPocxbn75Kk35ueN7nAVuahtLNKSA-ys8quXvIRtSp5dWicsPrHk2yjClA';
        const ordenData = ref(null);
        const pedidoId = ref(1);
        const pedidoCode = ref(null);

        const errorPayment = ref(null);

        const generarBoton = () => {
            
            ordenData.value = {

            };

            initPayphoneButton();
        }

        
        const initPayphoneButton = function(){
            payphone.Button({
                //token obtenido desde la consola de developer
                token: token,

                //PARÁMETROS DE CONFIGURACIÓN
                btnHorizontal: true,

                createOrder: function(actions){
                    // console.log('createOrden');
                    // console.log(ordenData.value);
                    //Se ingresan los datos de la transaccion ej. monto
                    return actions.prepare(ordenData.value)
                        .then(function(response){
                                // console.log('response',response);
                                // console.log('paymentId',response.paymentId);
                                pedidoCode.value = response.paymentId;
                            })
                            .catch(function(err){
                                errorPayment.value = err;
                                // console.log('err',err);
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

        return {
            pedidoId,
            ordenData, 
            generarBoton,
            initPayphoneButton,
            token,
            pedidoCode,
            errorPayment

        }
    },
}
</script>