import {Modal, Platform, StyleSheet, View} from 'react-native';
import React, {useRef, useEffect} from 'react';
import CurvedHeaderComp from './CurvedHeaderComp';
import {useTranslation} from '../Text/TextStrings';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {w, h} from 'react-native-responsiveness';
import {maincolor, redcolor} from '../assets/Colors';
import MapViewDirections from 'react-native-maps-directions';

const LiveTrackingComp = ({
  trackingModal,
  switchTrackingModal,
  deliveryInfo,
  driverLocation,
}) => {
  const {textStrings} = useTranslation();
  const map = useRef(null);

  // Update map view to focus on the new driver location
  useEffect(() => {
    if (driverLocation && map.current) {
      map.current.animateToRegion({
        latitude:
          driverLocation.latitude || deliveryInfo.locationCoordinates.latitude,
        longitude:
          driverLocation.longitude ||
          deliveryInfo.locationCoordinates.longitude,
        latitudeDelta: 0.0622,
        longitudeDelta: 0.0421,
      });
    }
  }, [driverLocation, deliveryInfo]);

  return (
    <Modal visible={trackingModal} onRequestClose={switchTrackingModal}>
      <View style={styles.fillscreenbg}>
        <CurvedHeaderComp
          name={textStrings.trackingOrderTxt}
          iconName1={'left'}
          firstbtnFun={switchTrackingModal}
          reddot={true}
        />
        <MapView
          ref={map}
          provider={PROVIDER_GOOGLE}
          style={styles.otherContent}
          // initialCamera={{zoom:15}}
          initialRegion={{
            latitude:
              driverLocation?.latitude ||
              deliveryInfo.locationCoordinates.latitude, // Default latitude
            longitude:
              driverLocation?.longitude ||
              deliveryInfo.locationCoordinates.longitude, // Default longitude
            latitudeDelta: 0.0622,
            longitudeDelta: 0.0421,
          }}>
          {deliveryInfo?.locationCoordinates?.latitude &&
          deliveryInfo?.locationCoordinates?.longitude ? (
            <Marker
              coordinate={{
                latitude: deliveryInfo.locationCoordinates.latitude,
                longitude: deliveryInfo.locationCoordinates.longitude,
              }}
              pinColor={redcolor}
              title={textStrings.yourSelectedLocationString}
              identifier="Your Selected Delivery Location"
            />
          ) : null}
          {driverLocation?.latitude && driverLocation?.longitude ? (
            <Marker
              coordinate={{
                latitude: driverLocation.latitude,
                longitude: driverLocation.longitude,
              }}
              pinColor={maincolor}
              title={textStrings.parcelLocation}
              identifier="Driver Location"
            />
          ) : null}
          {driverLocation?.latitude &&
          driverLocation?.longitude &&
          deliveryInfo?.locationCoordinates?.latitude &&
          deliveryInfo?.locationCoordinates?.longitude ? (
            <MapViewDirections
              origin={{
                latitude: driverLocation.latitude,
                longitude: driverLocation.longitude,
              }}
              destination={{
                latitude: deliveryInfo.locationCoordinates.latitude,
                longitude: deliveryInfo.locationCoordinates.longitude,
              }}
              strokeWidth={7}
              strokeColor={maincolor}
              apikey="AIzaSyDBwLNe1n4ITYmoqkgGip1-M8k7fpVZb6k"
              // apikey={AIzaSyDBwLNe1n4ITYmoqkgGip1 - M8k7fpVZb6k}
            />
          ) : null}
        </MapView>
      </View>
    </Modal>
  );
};

export default LiveTrackingComp;

const styles = StyleSheet.create({
  otherContent: {
    width: '100%',
    flex: 1,
  },
  fillscreenbg: {
    paddingTop: Platform.OS === 'ios' ? 5 : 0,
    height: h('100%'),
    width: w('100%'),
    backgroundColor: 'white',
  },
});
