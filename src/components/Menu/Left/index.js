import React, {Component} from 'react';
import {Image} from 'react-native';
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge,
  View,
} from 'native-base';
import styles from './Style';
import NavigationService from './../../../lib/Service/Navigation';

const drawerCover = require('@Asset/images/bg.png');
const drawerImage = require('@Asset/images/avatar.png');
const datas1 = [
  {
    name: 'Anasayfa',
    route: 'PublicHome',
    icon: 'home',
  },
  {
    name: 'Ara',
    route: 'PublicPropertySearch',
    icon: 'search',
  },
  {
    name: 'Kadromuz',
    route: 'MemberHome',
    icon: 'user-circle-o',
  },
  {
    name: 'Emlak Dünyası Hakkında',
    route: 'MemberFavorites',
    icon: 'info-circle',
  },
  {
    name: 'İletişim',
    route: 'MemberMessages',
    icon: 'address-card',
  },
];

class MenuLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
    };
  }

  renderList(datas) {
    return (
      <List
        dataArray={datas}
        renderRow={data => (
          <ListItem
            button
            noBorder
            onPress={() => this.props.navigation.navigate(data.route)}>
            <Left>
              <Icon
                active
                name={data.icon}
                style={{color: '#333', fontSize: 24, width: 30}}
                type={data.type || 'FontAwesome'}
              />
              <Text style={styles.text}>{data.name}</Text>
            </Left>
            {data.types && (
              <Right style={{flex: 1}}>
                <Badge>
                  <Text style={styles.badgeText}>{`${data.types}`}</Text>
                </Badge>
              </Right>
            )}
          </ListItem>
        )}
      />
    );
  }
  render() {
    return (
      <Container>
        <Content bounces={false} style={{flex: 1, top: -1}} render>
          <Image source={drawerCover} style={styles.drawerCover} />
          <View style={styles.drawerBg}>
            <Image square style={styles.drawerImage} source={drawerImage} />
            <Text style={styles.drawerText}>
              "Güvenilir Yatırımların Anahtarı"
            </Text>
          </View>

          <View style={styles.divider}>{this.renderList(datas1)}</View>
        </Content>
      </Container>
    );
  }
}

export default MenuLeft;
