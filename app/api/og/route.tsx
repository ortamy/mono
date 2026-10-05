/**
 * Динамическая OG-картинка 1200x630.
 *
 * Рендерится в PNG на сервере через satori, поэтому картинка всегда в одном
 * стиле с лендингом и не требует держать отдельный ассет в public/.
 *
 * runtime = 'nodejs': хостинг Render — это обычный Node-сервер, а edge-рантайм
 * там не поддерживается (экспериментально и зависит от окружения). Node-версия
 * работает везде, где работает сам Next.
 *
 * Шрифт Inter не подключается файлом: satori умеет только встроенные системные
 * гарнитуры, а загрузка .ttf означала бы читать файл из node_modules в рантайме.
 * Поэтому fontFamily не указан — используется дефолтный sans.
 */
import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: '#FFFFFF',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, color: '#737373', marginBottom: 16 }}>
          mono · кастомные интернет-магазины
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 72,
            fontWeight: 700,
            color: '#0A0A0A',
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Забирайте 100% выручки
        </div>

        <div style={{ display: 'flex', fontSize: 32, color: '#404040' }}>
          Свой магазин за 21 день. Без комиссий WB и Ozon.
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 48,
            fontSize: 24,
            color: '#737373',
          }}
        >
          0% комиссий · 21 день запуск · ИИ внутри · под ключ
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}