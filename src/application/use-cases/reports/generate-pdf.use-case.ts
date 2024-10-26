import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";


export class GeneratePDFUseCase {
  
  async execute(html: string){
    const file = await printToFileAsync({
      html: html,
      base64: false,
    });
    
    await shareAsync(file.uri);
  }
}
