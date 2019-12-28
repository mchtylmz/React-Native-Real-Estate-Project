import React from 'react';
import {
  Image,
  StyleSheet,
  StatusBar,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';
import {Container, Header, Content, View} from 'native-base';
import {AsyncStorage} from 'react-native';

import AppIntroSlider from 'react-native-app-intro-slider';

import NavigationService from '@Service/Navigation';

import Style from '@Theme/Style';

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
  },
});

const slides = [
  {
    title: 'Bölgenizdeki Emlaklar',
    text: 'Aradığınız ev parmaklarınızın ucunda',
    image: require('@Asset/images/1.png'),
    imageStyle: styles.image,
  },
  {
    title: 'Uygun Teklifler',
    text: 'Sizin için en uygun teklifleri bulmanıza yardımcı olalım.',
    image: require('@Asset/images/2.png'),
    imageStyle: styles.image,
  },
  {
    title: 'Sat veya Kirala',
    text: 'Emlak Dünyası ile evinizi, villanızı kolayca satın veya kiralayın!',
    image: require('@Asset/images/3.png'),
    imageStyle: styles.image,
  },
];

export default class extends React.Component {
  onDone = () => {
    AsyncStorage.setItem('_intro', '1');
    this.props.navigation.navigate('PublicHome');
  };
  onSkip = () => {
    AsyncStorage.setItem('_intro', '1');
    this.props.navigation.navigate('PublicHome');
  };
  render() {
    return (
      <Container style={Style.bgMainIntro}>
        <StatusBar
          backgroundColor="#7E8BF5"
          animated
          barStyle="light-content"
        />

        <AppIntroSlider
          slides={slides}
          onDone={this.onDone}
          onSkip={this.onSkip}
          skipLabel="Atla"
          nextLabel="Sonraki"
          prevLabel="Önceki"
          doneLabel="Tamamla"
          showSkipButton
        />
      </Container>
    );
  }
}
