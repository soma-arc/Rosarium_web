(in-package :cl-user)
(defpackage rosarium_web.web
  (:import-from :rosarium_web.config
                :*application-root*
                :*static-directory*
                :*contents-list*)
  (:use :cl
        :caveman2
        :rosarium_web.config
        :rosarium_web.view
        :rosarium_web.db
        :cl-fad
        :datafly
        :sxql)
  (:export :*web*))
(in-package :rosarium_web.web)

;; for @route annotation
(syntax:use-syntax :annot)

;;
;; Application

(defclass <web> (<app>) ())
(defvar *web* (make-instance '<web>))
(clear-routing-rules *web*)

;;
;; Routing rules

(defroute "/:content" (&key content)
  (render (merge-pathnames (pathname content) #p"contents/")
          `(:contents-list ,*contents-list*)))

(defroute "/" ()
  (render #P"index.html"
          `(:contents-list ,*contents-list*)))

;;
;; Error pages

(defmethod on-exception ((app <web>) (code (eql 404)))
  (declare (ignore app))
  (merge-pathnames #P"_errors/404.html"
                   *template-directory*))
