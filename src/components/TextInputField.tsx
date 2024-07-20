import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import Feather from 'react-native-vector-icons/Feather';

interface TextInputFieldProp {
  value: string;
  handleOnChageText: any;
  error: any;
  placeholder: string;
  themeColor: any;
  icon?: any;
  iconText?: any;
  size: 'S' | 'M';
  keyboardType: any;
  returnKeyType: 'done' | 'next' | 'search' | 'go' | 'send';
}

const TextInputField: React.FC<TextInputFieldProp> = ({
  handleOnChageText,
  value,
  error,
  placeholder,
  themeColor,
  icon,
  size,
  iconText,
  keyboardType = 'default',
  returnKeyType = 'done',
}) => {
  const inputHeight =
    size === 'S' ? SPACING.space_20 * 2 : SPACING.space_20 * 2.5;
  return (
    <View
      style={[
        styles.InputContainerComponent,
        {
          borderColor: error ? COLORS.primaryRedHex : '',
          borderWidth: error ? 1 : 0,
          backgroundColor: themeColor.priamryDarkBg,
        },
      ]}>
      {icon && (
        <TouchableOpacity>
          <Feather
            name={icon}
            size={20}
            color={error ? COLORS.primaryRedHex : themeColor.primaryText}
            style={styles.InputIcon}
          />
        </TouchableOpacity>
      )}
      {iconText && (
        <TouchableOpacity style={{width: SPACING.space_40 * 3.5}}>
          <Text style={[styles.InputIcon, {color: themeColor.secondaryText}]}>
            {iconText}
          </Text>
        </TouchableOpacity>
      )}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={COLORS.primaryLightGreyHex}
        style={[
          styles.TextInputContainer,
          {color: themeColor.secondaryText, height: inputHeight},
        ]}
        onChangeText={handleOnChageText}
        value={value}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
      />
    </View>
  );
};

export default TextInputField;

const styles = StyleSheet.create({
  InputContainerComponent: {
    flexDirection: 'row',
    marginHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_8,
    borderRadius: BORDERRADIUS.radius_10,
    alignItems: 'center',
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  TextInputContainer: {
    flex: 1,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    paddingHorizontal: SPACING.space_20,
  },
});
