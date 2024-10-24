import React, { useState } from "react";
import { Button, Image, View } from "react-native";
import { pickImageFromLibrary } from "../../profile-picture/imagePicker";

export const ImagePickerExample = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handlePickImage = async () => {
    const uri = await pickImageFromLibrary();
    if (uri) {
      setImageUri(uri);
    }
  };

  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Button title="Seleccionar imagen" onPress={handlePickImage} />
      {imageUri && (
        <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
};
