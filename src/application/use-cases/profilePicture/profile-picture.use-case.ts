import * as ImagePicker from "expo-image-picker";

export class PickImageUseCase {
  async execute(): Promise<string | null> {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Se requieren permisos para acceder a la galería.");
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      return result.assets[0].uri;
    }

    return null;
  }
}
