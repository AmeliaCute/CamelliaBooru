import { TouchableOpacity, View, StyleSheet, Text, type ViewProps, TextInput, TextInputProps, Animated, FlatList } from 'react-native';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import { useState, useRef } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';

interface DropdownItem {
  Label: string;
  Value: string;
}

export type ThemedDropdownProps = TextInputProps & {
  style?: ViewProps['style'];
  icon?: IconSymbolName;
  title?: string;
  outlineWidth?: number;
  shadowOpacity?: number;
  colorPreset: 'Important' | 'Normal';
  options: DropdownItem[];
  onSelect: (value: string) => void;
};

export function ThemedDropdown({ style, icon = 'checkmark.circle', title, outlineWidth, colorPreset, shadowOpacity, options, onSelect, ...otherProps }: ThemedDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string>(title || 'Select an option');
  const animation = useRef(new Animated.Value(0)).current;

  const color = useThemeColor({}, `textInputBox${colorPreset}`);
  const textColor = useThemeColor({}, `textInputColor${colorPreset}`);
  const outlineColor = useThemeColor({}, `textInputOutline${colorPreset}`);

  const toggleDropdown = () => {
    Animated.timing(animation, {
      toValue: isOpen ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setIsOpen(!isOpen);
  };

  const handleSelect = (item: DropdownItem) => {
    setSelectedLabel(item.Label);
    onSelect(item.Value);
    toggleDropdown();
  };

  const dropdownHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, options.length * 50],
  });

  return (
    <View style={[styles.wrapper, style]}>
      <TouchableOpacity 
        style={[styles.container, {
          backgroundColor: color,
          borderColor: outlineColor,
          borderWidth: outlineWidth || 0,
          shadowOffset: { width: 0, height: outlineWidth || 0 },
          shadowColor: outlineColor,
          shadowRadius: 0,
          shadowOpacity: shadowOpacity || 0
        }]}
        onPress={toggleDropdown}
        activeOpacity={0.8}
      >
        <IconSymbol 
          name={isOpen ? 'chevron.right' : icon} 
          size={30} 
          color={textColor}
        />
        <Text style={[styles.text, { color: textColor }]} numberOfLines={1}>
          {selectedLabel}
        </Text>
        
      </TouchableOpacity>

      <Animated.View 
        style={[
          styles.dropdown, 
          { 
            height: dropdownHeight,
            backgroundColor: color,
            borderColor: outlineColor,
            borderWidth: isOpen ? (outlineWidth || 0) : 0,
            shadowOffset: { width: 0, height: outlineWidth || 0 },
            shadowColor: outlineColor,
            shadowRadius: 0,
            shadowOpacity: isOpen ? (shadowOpacity || 0) : 0
          }
        ]}
      >
        <FlatList
          data={options}
          keyExtractor={(item) => item.Value}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.option, { borderBottomColor: outlineColor }]}
              onPress={() => handleSelect(item)}
            >
              <Text style={{ color: textColor }}>{item.Label}</Text>
            </TouchableOpacity>
          )}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    width: '100%',
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 30,
    paddingHorizontal: 15,
    gap: 15,
    justifyContent: 'flex-start',
    height: 60,
  },
  text: {
    flexGrow: 1,
    flex: 1,
    height: 14,
    fontFamily: 'Comfortaa',
    fontWeight: '700',
  },
  dropdown: {
    position: 'absolute',
    top: '95%',
    left: 0,
    right: 0,
    borderRadius: 16,
    overflow: 'hidden',
    zIndex: 1000,
  },
  option: {
    padding: 16,
    borderBottomWidth: 1,
  },
});