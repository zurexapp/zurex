import {ActivityIndicator, Alert, StyleSheet, View} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {Tabby, TabbyPaymentWebView} from 'tabby-react-native-sdk';

const TbbyPayment = () => {
  const [isUrlAvailable, setIsUrlAvailable] = useState(false);

  // Use useCallback and move myTestPayment inside to avoid changes on every render
  const createSessionFun = useCallback(async () => {
    const myTestPayment = {
      merchant_code: 'ايه سي زيوركسsau',
      lang: 'en',
      payment: {
        amount: '320.00',
        currency: 'SAR',
        buyer: {
          email: 'card.success@tabby.ai',
          phone: '+966500000001',
          name: 'Yazan Khalid',
          dob: '1999-08-24',
        },
        buyer_history: {
          registered_since: '2019-08-24T14:15:22Z',
          loyalty_level: 0,
        },
        order: {
          tax_amount: '0.00',
          shipping_amount: '0.00',
          discount_amount: '0.00',
          reference_id: '#x-abc123',
          items: [
            {
              title: 'Jersey',
              description: 'Jersey',
              quantity: 1,
              unit_price: '10.00',
              reference_id: 'uuid',
              product_url: 'http://example.com',
              category: 'clothes',
            },
          ],
        },
        order_history: [
          {
            purchased_at: '2019-08-24T14:15:22Z',
            amount: '0.00',
            payment_method: 'card',
            status: 'new',
            buyer: {
              email: 'card.success@tabby.ai',
              phone: '+966500000001',
              name: 'Yazan Khalid',
              dob: '2019-08-24',
            },
            shipping_address: {
              city: 'string',
              address: 'string',
              zip: 'string',
            },
            items: [
              {
                title: 'string',
                description: 'string',
                quantity: 1,
                unit_price: '0.00',
                reference_id: 'string',
                product_url: 'http://example.com',
                category: 'string',
              },
            ],
          },
        ],
      },
    };

    try {
      const response = await fetch('https://api.tabby.ai/api/v2/checkout', {
        method: 'POST',
        headers: new Headers({
          Authorization: 'Bearer pk_test_0c164983-e322-4e28-9f9e-27e3dd191a4d',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(myTestPayment),
      });
      const result = await response.json();
      console.log('Checkout session created:', result);
      // Update the state if URL is available
      setIsUrlAvailable(
        result?.configuration?.available_products?.installments[0]?.web_url ||
          '',
      );
    } catch (e) {
      console.error('Error creating session:', e);
    }
  }, []); // Now no dependencies on myTestPayment, since it's inside the callback

  useEffect(() => {
    createSessionFun();
  }, [createSessionFun]); // Call createSessionFun when component mounts

  const parseMessage = msg => {
    switch (msg) {
      case 'authorized':
        break;
      case 'rejected':
        break;
      case 'close':
        break;
      case 'expired':
        break;
      default:
        break;
    }
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      {isUrlAvailable ? (
        <TabbyPaymentWebView
          onBack={() => Alert.alert('Back')}
          url={isUrlAvailable}
          onResult={parseMessage}
        />
      ) : (
        <ActivityIndicator size={'large'} color={'red'} />
      )}
    </View>
  );
};

export default TbbyPayment;

const styles = StyleSheet.create({});
