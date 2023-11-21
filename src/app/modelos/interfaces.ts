export class About {
    id: number;
    attributes: {
      telephone: string;
      titulo: string;
      descripcion: string;
      direccion: string;
      email: string;
      web: string;
      portfolio: string;
      linkedin: string;
      instagram: string;
      github: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      foto: {
        data: {
          id: number;
          attributes: {
            name: string;
            alternativeText: string | null;
            caption: string | null;
            width: number;
            height: number;
            formats: {
              thumbnail: {
                name: string;
                hash: string;
                ext: string;
                mime: string;
                path: string | null;
                width: number;
                height: number;
                size: number;
                url: string;
              };
              medium: {
                name: string;
                hash: string;
                ext: string;
                mime: string;
                path: string | null;
                width: number;
                height: number;
                size: number;
                url: string;
              };
              small: {
                name: string;
                hash: string;
                ext: string;
                mime: string;
                path: string | null;
                width: number;
                height: number;
                size: number;
                url: string;
              };
              large: {
                name: string;
                hash: string;
                ext: string;
                mime: string;
                path: string | null;
                width: number;
                height: number;
                size: number;
                url: string;
              };
            };
            hash: string;
            ext: string;
            mime: string;
            size: number;
            url: string;
            previewUrl: string | null;
            provider: string;
            provider_metadata: any | null;
            createdAt: string;
            updatedAt: string;
          };
        };
      };
    };
  
    constructor(data: any) {
      this.id = data.id;
      this.attributes = data.attributes;
    }
  }