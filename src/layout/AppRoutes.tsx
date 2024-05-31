import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from '@/layout/AppLayout';
import * as pages from '@/pages';

import { routes } from './routes';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                path: routes.index.path,
                element: <pages.MainPage />,
                index: true,
            },
            {
                path: routes.meditation.path,
                element: <pages.MeditationPage />,
            },
            {
                path: routes.index.path,
                element: <pages.MainPage />,
            },
            {
                path: routes.meditation.path,
                element: <pages.MeditationPage />,
            },
            {
                path: routes.podcasts.path,
                element: <pages.PodcastPage />,
            },
            {
                path: routes.videos.path,
                element: <pages.VideosPage />,
            },
            {
                path: routes.video.path,
                element: <pages.VideoPage />,
            },
            {
                path: routes.questions.path,
                element: <pages.QuestionPage />,
            },
            {
                path: routes.statistics.path,
                element: <pages.StatisticsPage />,
            },
            {
                path: routes.tasks.path,
                element: <pages.StatisticsTasksPage />,
            },
            {
                path: routes.manuals.path,
                element: <pages.ManualsPage />,
            },
            {
                path: routes.infoBook.path,
                element: <pages.BookInfo />,
            },
            {
                path: routes.infoManual.path,
                element: <pages.ManualInfo />,
            },
            {
                path: routes.mediaMeditation.path,
                element: <pages.MediaMeditation />,
            },
            {
                path: routes.mediaPodcast.path,
                element: <pages.MediaPodcast />,
            },
            {
                path: routes.courses.path,
                element: <pages.CoursesPage />,
            },
            {
                path: routes.infoCourse.path,
                element: <pages.CourseInfo />,
            },
            {
                path: routes.infoCourseShow.path,
                element: <pages.CourseShowInfo />,
            },
            {
                path: routes.delivery.path,
                element: <pages.DeliveryPage />,
            },
            {
                path: routes.waterTracker.path,
                element: <pages.WaterTracker />,
            },
            {
                path: '*',
                element: <pages.NotFoundPage />,
            },
        ],
    },
]);
