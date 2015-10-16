(in-package :cl-user)
(defpackage rosarium_web.config
  (:use :cl)
  (:import-from :cl-fad
                :list-directory)
  (:import-from :cl-ppcre
                :scan
                :regex-replace-all
                :split)
  (:import-from :envy
                :config-env-var
                :defconfig)
  (:export :config
           :*application-root*
           :*static-directory*
           :*contents-directory*
           :*template-directory*
           :*ps-lisp-directory*
           :*built-js-dic*
           :*contents-list*
           :appenv
           :developmentp
           :productionp))
(in-package :rosarium_web.config)

(setf (config-env-var) "APP_ENV")

(defparameter *application-root*   (asdf:system-source-directory :rosarium_web))
(defparameter *static-directory*   (merge-pathnames #P"static/" *application-root*))
(defparameter *contents-directory*   (merge-pathnames #P"static/contents/" *application-root*))
(defparameter *template-directory* (merge-pathnames #P"templates/" *application-root*))
(defparameter *ps-lisp-directory* (merge-pathnames #P"src/ps/" *application-root*))

(defparameter *built-js-dic* (make-hash-table :test #'equal))

(defparameter *contents-list*
  (let ((files (mapcar #'file-namestring
                       (cl-fad:list-directory (merge-pathnames #P"contents/" *template-directory*))))
        (contents-list nil))
    (loop for file in files do
         (if (ppcre:scan "\\.html$" file)
             (push `(:url ,(concatenate 'string "/" file)
                          :title ,(ppcre:regex-replace-all "\\_"
                                                           (car (ppcre:split "\\." file))
                                                           " "))
                   contents-list)))
    (nreverse contents-list)))

(defconfig :common
  `(:databases ((:maindb :sqlite3 :database-name ":memory:"))))

(defconfig |development|
  '())

(defconfig |production|
  '())

(defconfig |test|
  '())

(defun config (&optional key)
  (envy:config #.(package-name *package*) key))

(defun appenv ()
  (asdf::getenv (config-env-var #.(package-name *package*))))

(defun developmentp ()
  (string= (appenv) "development"))

(defun productionp ()
  (string= (appenv) "production"))
