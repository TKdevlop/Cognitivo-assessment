FROM python:3.7
RUN pip install flask
RUN pip install flask-cors
COPY backend/ backend
WORKDIR /backend
ENTRYPOINT [ "python" ]
CMD [ "api.py" ]
