import { MathEvent } from './events';

/**
 * 구글 스프레드시트의 '웹에 게시(CSV)' URL을 사용하여 데이터를 가져오고
 * 사용자 시트 구조에 맞게 매핑합니다.
 */
export async function fetchEventsFromSheet(sheetUrl: string, isForeign: boolean): Promise<MathEvent[]> {
  try {
    const response = await fetch(sheetUrl, { next: { revalidate: 3600 } }); 
    const csvData = await response.text();
    
    // CSV 파싱 (기본적인 쉼표 분리 - 따옴표 포함된 복잡한 데이터는 추가 처리가 필요할 수 있음)
    // 실제 운영 시에는 파싱 라이브러리 사용 권장
    const lines = csvData.split('\n').filter(line => line.trim() !== '');
    if (lines.length <= 1) return [];

    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    
    return lines.slice(1).map((line, index) => {
      // 쉼표로 분리하되 따옴표 내부의 쉼표는 무시하는 정규식
      const row = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || line.split(',');
      const data: any = {};
      headers.forEach((header, i) => {
        data[header] = row[i]?.trim().replace(/"/g, '') || '';
      });

      if (isForeign) {
        // 국외 시트 매핑
        return {
          id: `foreign-${index}`,
          title: data['관련 내용 및 행사'] || data['기관/사이트명'] || '제목 없음',
          organization: data['기관/사이트명'] || '정보 없음',
          startDate: '2026-03-01',
          endDate: '2026-12-31',
          category: (data['분류'] || '공모전') as any,
          target: ['교사 및 일반'], // 국외 데이터는 기본적으로 교사용이 많음
          region: data['국가/지역'] || '해외',
          image: '/banner.png', // 기본 이미지
          link: data['웹사이트 URL 주소'] || '#',
          isForeign: true
        } as MathEvent;
      } else {
        // 국내 시트 매핑
        return {
          id: `domestic-${index}`,
          title: data['주요 내용 및 특징']?.substring(0, 50) || data['기관/사이트명'] || '제목 없음',
          organization: data['기관/사이트명'] || '정보 없음',
          startDate: '2026-03-01',
          endDate: '2026-12-31',
          category: (data['카테고리'] || '공모전') as any,
          target: ['학생'], // 국내 데이터는 기본적으로 학생용이 많음
          region: '국내',
          image: '/banner.png',
          link: data['웹사이트 URL 주소'] || '#',
          isForeign: false
        } as MathEvent;
      }
    });
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    return [];
  }
}
