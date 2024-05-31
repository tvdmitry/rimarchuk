import { lazy } from 'react';

const DeliveryPage = lazy(() => import('./delivery/DeliveryPage'));
const MainPage = lazy(() => import('./main/MainPage'));
const ManualsPage = lazy(() => import('./manuals/ManualsPage'));
const MeditationPage = lazy(() => import('./meditation/MeditationPage'));
const NotFoundPage = lazy(() => import('./NotFoundPage/NotFound'));
const PodcastPage = lazy(() => import('./podcast/PodcastPage'));
const QuestionPage = lazy(() => import('./questions/QuestionPage'));
const StatisticsPage = lazy(() => import('./statistics/StatisticsPage'));
const StatisticsTasksPage = lazy(() => import('./statisticsTasks/StatisticTasksPage'));
const VideosPage = lazy(() => import('@/pages/videos/VideoPage'));
const VideoPage = lazy(() => import('@/pages/video/VideoPage'));
const CoursesPage = lazy(() => import('./courses/CoursesPage'));

// parts
const BookInfo = lazy(() => import('./bookInfo/BookInfoPage'));
const ManualInfo = lazy(() => import('./manualInfo/ManualInfoPage'));
const MediaMeditation = lazy(() => import('./mediaMediation/MediaMeditationPage'));
const MediaPodcast = lazy(() => import('./mediaPodcast/MediaPodcastPage'));
const CourseInfo = lazy(() => import('./courseInfo/CourseInfoPage'));
const CourseShowInfo = lazy(() => import('./courseShowInfo/CourseShowInfoPage'));
const WaterTracker = lazy(() => import('./waterTracker/WaterTrackerPage'));

export {
    DeliveryPage,
    MainPage,
    ManualsPage,
    MeditationPage,
    NotFoundPage,
    PodcastPage,
    QuestionPage,
    StatisticsPage,
    StatisticsTasksPage,
    VideosPage,
    VideoPage,
    CoursesPage,

    // parts
    BookInfo,
    ManualInfo,
    MediaMeditation,
    MediaPodcast,
    CourseInfo,
    CourseShowInfo,
    WaterTracker,
};
