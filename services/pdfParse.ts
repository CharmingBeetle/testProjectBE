import pdfParse from "pdf-parse";
 

export const extractTextFromPdf = async (pdfBuffer:Buffer):Promise<string> => {
    try {
        const data = await pdfParse(pdfBuffer);
        console.log(data.text)
        return data.text;
    }
    catch (error) {
        console.error("Error parsing PDF:", error);
        throw new Error("Failed to parse PDF");
    }
};

