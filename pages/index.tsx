/**
 * @template PageComponent
 */

import { useCallback, useState } from 'react';

import { Button } from '@components/ui';

import { fetcher } from '@lib/fetcher';

import DragDrop from '@components/DragDrop';
// import KaitaiStream from 'kaitai-struct/KaitaiStream';
import WindowsEvtLog from './WindowsEvtLog';

export default function IndexPage() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState(null);

  const handleSubmit = useCallback(async () => {
    if (!file) return;
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('test', 'text');
      form.append('test2', 'text2');
      form.append('test3', 'text3');

      await fetcher.post('/api', {
        method: 'POST',
        body: form,
      });
    } catch (err) {
      console.log(err);
    }
  }, [file]);

  return (
    <div className="mx-auto max-w-screen-md text-2xl pt-4 h-[1200px]">
      <DragDrop
        maximumSize={1}
        onDropFile={(file) => {
          console.log(file);
          setFile(file);
        }}
        className="w-full"
      />
      {file && <p className="mt-8">FileInfo: {JSON.stringify(file.name)}</p>}
      {file && (
        <Button
          onClick={() => {
            handleSubmit();
            // const arrayBuffer = await file.arrayBuffer();
            // console.log('check', arrayBuffer);
            // const data = new WindowsEvtLog(new KaitaiStream(arrayBuffer));
            // evt();
            // console.log(data);
          }}
        >
          submit
        </Button>
      )}
    </div>
  );
}
