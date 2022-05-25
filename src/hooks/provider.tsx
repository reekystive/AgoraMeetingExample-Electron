/* eslint-disable import/prefer-default-export */
import React, { FC, useEffect, useState, useReducer } from 'react';

import AgoraRtcEngine from 'agora-electron-sdk';
import log from 'electron-log';

import { MeetingInfoContext, MeetingInfoReducer } from './info';
import { MeetingManager, MeetingManagerContext } from './manager';

export const MeetingProvider: FC = (props) => {
  const { children } = props;
  const [rtcEngine, setRtcEngine] = useState<AgoraRtcEngine>();
  const [meetingManager, setMeetingManager] = useState<MeetingManager>();
  const [info, infoDispatcher] = useReducer(MeetingInfoReducer, {});

  useEffect(() => {
    if (!rtcEngine) {
      const engine = new AgoraRtcEngine();
      setRtcEngine(engine);

      log.info('initialize engine...');
    }

    return () => {
      if (rtcEngine) {
        rtcEngine.release();
        setRtcEngine(undefined);

        log.info('release engine...');
      }
    };
  }, []);

  useEffect(() => {
    if (!meetingManager && rtcEngine) {
      const manager = new MeetingManager(rtcEngine, {
        meetingInfo: info,
        meetingInfoDispatcher: infoDispatcher,
      });
      setMeetingManager(manager);

      log.info('initialize meeting manager...');
    }

    if (meetingManager && !rtcEngine) {
      setMeetingManager(undefined);
      log.info('release meeting manager...');
    }
  }, [rtcEngine]);

  return (
    <MeetingInfoContext.Provider
      value={{ meetingInfo: info, meetingInfoDispatcher: infoDispatcher }}
    >
      <MeetingManagerContext.Provider
        value={{
          meetingManager,
        }}
      >
        {children}
      </MeetingManagerContext.Provider>
    </MeetingInfoContext.Provider>
  );
};
