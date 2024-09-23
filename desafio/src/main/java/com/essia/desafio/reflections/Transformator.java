package com.essia.desafio.reflections;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;

/**
 * Classe que vai transformar um objeto em um objeto DTO
 * Para funcionar o sufixo da classe tem que terminar DTO e os atributos que tem no objeto tem que estar com o mesmo nome no DTO
 */
public class Transformator {
    public <I, O> O transformToDto(I input) throws ClassNotFoundException, NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        Class<?> source = input.getClass();
        String packageAndclassName = source.getName().replace("entities", "dto");
        Class<?> target = Class.forName(packageAndclassName + "DTO");

        return getTargetClass(input, target, source);
    }

    public <I, O> O transformDtoToObject(I input) throws ClassNotFoundException, NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        Class<?> source = input.getClass();
        String packageAndclassName = source.getName().replace("dto", "entities").replace("DTO", "");
        Class<?> target = Class.forName(packageAndclassName);

        return getTargetClass(input, target, source);
    }

    private <I, O> O getTargetClass(I input, Class<?> target, Class<?> source) throws InstantiationException, IllegalAccessException, InvocationTargetException, NoSuchMethodException {
        O targetClass = (O) target.getDeclaredConstructor().newInstance();

        Field[] sourceFields = input.getClass().getDeclaredFields();
        Field[] targetFields = targetClass.getClass().getDeclaredFields();
        Arrays.stream(sourceFields).forEach(sourceField ->
                Arrays.stream(targetFields).forEach(targetField -> {
                    if (sourceField.getName().equals(targetField.getName()) && sourceField.getType().equals(targetField.getType())) {
                        sourceField.setAccessible(true);
                        targetField.setAccessible(true);
                        try {
                            Object res = sourceField.get(input);
                            targetField.set(targetClass, res);
                        } catch (IllegalAccessException e) {
                            throw new RuntimeException(e);
                        }
                    }

                }));
        return targetClass;
    }
}
