import { SrfDto } from './srf.dto';
import { Srf } from './srf.model';

export class SrfMapper {
    public static toDto (srf: Srf): SrfDto {
        return new SrfDto(srf.date, srf.serverName, srf.fileName, srf.fileSize, 
            srf.lastModifiedDate === srf.lastModifiedTime ? srf.lastModifiedDate : srf.lastModifiedDate + ' ' + srf.lastModifiedTime);
    }
  
    public static toModel (srfDto: SrfDto): Srf {

        return new Srf(srfDto.date, srfDto.serverName, srfDto.fileName, srfDto.fileSize, 
            srfDto.lastModified.length < 11 ? srfDto.lastModified : srfDto.lastModified.substring(0,11), 
            srfDto.lastModified.length < 11 ? srfDto.lastModified : srfDto.lastModified.substring(11));
    }

    public static toDtos (srfs: Srf[]): SrfDto[] {
        let dtos: SrfDto[] = [];

        for(let i=0; i < srfs.length; i++){
            dtos[i] = this.toDto(srfs[i]);
        }
        
        return dtos;
    }
  
    public static toModels (srfDtos: SrfDto[]): Srf[] {
        let srfs: Srf[] = [];

        for(let i=0; i < srfDtos.length; i++){
            srfs[i] = this.toModel(srfDtos[i]);
        }
        
        return srfs;
    }
}